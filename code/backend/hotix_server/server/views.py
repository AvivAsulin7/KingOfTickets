# from django.shortcuts import render

# Create your views here.

import io
from django.db.models import Q
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from server.models import Event
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.response import Response
from server.serializers import *
from django.core.exceptions import *
from datetime import datetime, timedelta
from django.core.mail import EmailMessage, send_mail
from django.template.loader import render_to_string
from hotix_server import settings
import os
from django.http import HttpResponse
from pdfminer.high_level import extract_text
import re
from django.core.files import File


# Create your views here.


############### sign up ###############
@api_view(['POST'])
def sign_up(request):
    username = request.data["username"]
    email = request.data["email"]
    password = request.data["password"]
    firstname = request.data["firstname"]
    lastname = request.data["lastname"]
    image = request.data.get("image")

    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already exists'})

    if User.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Email already exists'})

    try:
        user = User.objects.create_user(
            username=username, email=email, password=password, first_name=firstname, last_name=lastname)
        account = Account(user_id=user.id, image=image)
        account.save()
        account_image = Account.objects.select_related(
            'user').get(user__username=user.username)

        serializer = CurrentAccountSerializer(account_image)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'})


############### sign in ###############
@api_view(['POST'])
def sign_in(request):
    username = request.data.get('username', None)

    if not username:
        return Response('missing params', status=404)

    try:
        account_image = Account.objects.select_related(
            'user').get(user__username=username)

        serializer = CurrentAccountSerializer(account_image)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        return Response({'error': 'Something went wrong, Please try again'}, status=400)

    ############### get user data ###############


@api_view(['GET'])
def getUserById(_, id):
    try:
        user = User.objects.filter(id=id).values("first_name", "last_name")
        account_image = Account.objects.get(user_id=id)
        serializer = CurrentAccountSerializer(account_image)

        return Response({"image": serializer.data, "user": user[0]}, status=status.HTTP_200_OK)
        return JsonResponse(user[0])

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'}, status=400)


@api_view(['GET'])
def getEventsByCategory(_, category):
    try:
        events = Event.objects.filter(category=category).values()
        if len(events) == 0:
            return JsonResponse({'error': 'No Found Events'})
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'})


@api_view(['GET'])
def getEventsInfo(_,):
    try:
        events = Event.objects.filter().values()
        cities = [event["city"] for event in events]
        names = [event["event_name"] for event in events]

        names = removeDuplicateElement(names)
        cities = removeDuplicateElement(cities)

        fields = {'cities': cities, 'names': names}
        return Response(fields, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'})


def removeDuplicateElement(array):
    for i in range(len(array)):
        if array[i] is not None:
            array[i] = array[i].capitalize()

    return list(set(array))


@api_view(['GET'])
def getUpcomingEvents(_,):
    today = datetime.today()
    next_month = today + timedelta(days=31)
    try:
        events = Event.objects.filter(date__gte=today,
                                      date__lte=next_month)
        if len(events) == 0:
            return JsonResponse({'error': 'No Found Events'})
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'})


@api_view(['POST'])
def searchEvents(request):
    name_option = request.data.get('Event')
    location_option = request.data.get('City')
    date_option = request.data.get('Date')

    try:
        locations = Event.objects.filter(city=location_option).values()
        names = Event.objects.filter(event_name=name_option).values()
        dates = Event.objects.filter(date=date_option).values()

        if len(locations) != 0 and len(names) != 0 and len(dates) != 0:
            events = locations & names & dates
        elif len(names) == 0 and len(dates) == 0:
            if date_option is None:
                events = locations
            else:
                events = []

        elif len(locations) == 0 and len(dates) == 0:
            if date_option is None:
                events = names
            else:
                events = []

        elif len(locations) == 0 and len(names) == 0:
            events = dates
        elif len(locations) == 0:
            events = dates & names
        elif len(names) == 0:
            events = dates & locations
        elif len(dates) == 0:
            if date_option is None:
                events = locations & names
            else:
                events = []

        if len(events) == 0:
            return JsonResponse({'error': 'No Found Events'})
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'})


@api_view(['GET'])
def getEventById(_, eid):

    try:
        event = Event.objects.filter(id=eid).values()
        return JsonResponse(event[0])

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'})


@api_view(['GET'])
def getTicketByEventId(_, eid):
    try:
        tickets = Ticket.objects.filter(
            id_event_id=eid, is_sold=False).select_related('id_event').values('row', 'type', 'seat', 'price', 'age', 'id')

        if len(tickets) == 0:
            return JsonResponse({'error': 'No Tickets to this event'})

        tickets_list = list(tickets)
        tickets_dict_list = []

        for ticket in tickets_list:
            ticket_dict = {
                'id': ticket['id'], 'type': ticket['type'], 'row': ticket['row'], 'seat': ticket['seat'], 'age': ticket['age'], 'price': ticket['price']}
            tickets_dict_list.append(ticket_dict)
        return JsonResponse(tickets_dict_list, status=status.HTTP_200_OK, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'})


@api_view(['POST'])
def uploadTickets(request):
    formData = request.data
    ticket = formData
    try:
        id_event = formData["id_event"]
        id_owner = formData["id_owner"]
        pdf_file = request.FILES.get('pdf_file')

        event = Event.objects.get(pk=id_event)
        owner = User.objects.get(pk=id_owner)

        ticket1 = Ticket(id_event=event, id_owner=owner, row=ticket['row'],
                         seat=ticket["seat"], area=ticket["area"], age=ticket["age"], type=ticket["type"],
                         price=ticket["price"], pdf_file=pdf_file, is_sold=False)
        ticket1.save()

        ticket_model = Ticket.objects.get(pk=ticket1.id)

        deal = Deal(id_ticket=ticket_model, id_seller=owner, id_buyer=owner,
                    price=ticket["price"],  status="wating for sale", reason="")
        deal.save()
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'The tickets did not go on sale, please try again.'})
    return Response({"message": "Yout tickets uploaded successfully"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def checkValidityTicket(request):
    formData = request.data
    pdf_file = request.FILES.get('pdf_file')

    for field in formData.values():
        result = checkValidField(field)
        if result == True:
            return JsonResponse({'error': 'Some details are missing or invalid.'}, status=status.HTTP_400_BAD_REQUEST)

    extracted_price = extract_pdf_text(pdf_file)
    if extracted_price == "No Price in PDF":
        return JsonResponse({'error': 'There is no price on the ticket, please make sure you inserted the ticket correctly '}, status=400)
    
    if('$' in extracted_price):
       extracted_price = float(extracted_price.replace('$', ''))

    if float(formData["price"]) > extracted_price:
        return JsonResponse({'error': "The price you entered does not match the ticket price you uploaded"}, status=400)

    return JsonResponse({'succsess': 'All deatils is Valid!'})


def extract_pdf_text(pdf_file):
    # Assuming you have a PDF file uploaded in the request

    # Extract text from the PDF
    pdf_bytes = pdf_file.read()
    pdf_io = io.BytesIO(pdf_bytes)
    text = extract_text(pdf_io)

    regex_array = [r"\$\d+(?:\.\d{2})?",
                   r"\$\s*\d+(?:\.\d{2})?",
                   r"\b\d+(?:\.\d{2})?\$",
                   r"\b\d+\s*\$"]

    for regex in regex_array:
        matches = re.findall(regex, text)
        try:

            return matches[0]

        except:
            print("No Price in this regex: {regex}")

    return "No Price in PDF"


def checkValidField(field):
    if field is None or field == '' or field == 'undefined':
        return True
    else:
        return False


@api_view(['POST'])
def buyTicket(_, tid, id):

    try:
        user = get_object_or_404(User, id=id)
        deal = get_object_or_404(Deal, id_ticket=tid)
        deal.id_buyer = user
        deal.status = "sold"
        deal.save()

        ticket = get_object_or_404(Ticket, id=tid)
        ticket.is_sold = True
        ticket.id_owner = user
        ticket.save()
        file = io.BytesIO(ticket.pdf_file.read())
        pdf_file = File(file)
        email = EmailMessage(
            'HOTIX',
            'Your Ticket is Here ! , enjoy.',
            settings.EMAIL_HOST_USER,
            [user.email],
        )

        email.attach('ticket.pdf', pdf_file.read(), 'application/pdf')

    # Send the email

        email.send()

    except Exception as error:
        print(error)
        return JsonResponse({'error': 'The purchase was not successful, please try again.', error: error}, status=400)

    return JsonResponse({"message": "Deal success!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getTickets(_, uid, state):

    try:
        if state == "seller":
            deals = Deal.objects.filter(id_seller=uid).values()

        else:

            deals = Deal.objects.filter(id_buyer=uid).exclude(
                Q(id_seller=uid)).values()

        if len(deals) == 0:
            return JsonResponse({'error': 'No Found Tickets'})

        deals1 = []

        for deal in deals:
            ticket = Ticket.objects.filter(
                id=deal["id_ticket_id"]).values().first()
            event = Event.objects.filter(
                id=ticket["id_event_id"]).values().first()
            if state == "buyer":
                user = User.objects.filter(
                    id=deal["id_seller_id"]).values().first()
            if state == "seller":
                user = User.objects.filter(id=deal["id_buyer_id"]).values(
                    "first_name", "last_name").first()

            if ticket:
                deal1 = {**deal, **ticket, **event, **user}

                deals1.append(deal1)

        return Response(deals1, status=status.HTTP_200_OK)

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Something went wrong, Please try again'})


@api_view(['PATCH'])
def updateStatusLocationDeal(request):
    result_location = request.data.get("result")
    did = request.data.get("did")
    try:
        if result_location is True:
            result = "Buyer Arrived"
        else:
            if result_location is False:
                result = "Buyer not Arrived"

        deal = Deal.objects.get(id_deal=did)

        if deal:
            deal.status_location = result
            deal.save()
    except:

        return JsonResponse({'error': 'Something went wrong, Please try again'})

    return Response(result, status=status.HTTP_200_OK)
