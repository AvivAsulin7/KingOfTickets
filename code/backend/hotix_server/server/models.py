from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.


class Account (models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    image = models.CharField(max_length=1000 , null=True)

    def __str__(self):
       return f"{settings.MEDIA_URL}{self.image}"


class Event (models.Model):
    location = models.CharField(max_length=40, null=True)
    city = models.CharField(max_length=40, null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    event_name = models.CharField(max_length=40, null=True)
    time_create = models.DateTimeField(
        auto_now=True, null=True)
    image = models.CharField(max_length=1000 , null=True)
    image_map_event = models.CharField(max_length=1000 , null=True)
    category = models.CharField(max_length=40 , null=True)


class Ticket (models.Model):
    id_event = models.ForeignKey(Event, on_delete=models.CASCADE)
    id_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_sold = models.BooleanField(auto_created=False)
    row = models.IntegerField(null=True)
    area = models.CharField(max_length=40, null=True)
    seat = models.IntegerField(null=True)
    price = models.FloatField(null=True)
    type = models.CharField(max_length=40, null=True)
    age = models.CharField(max_length=40, null=True)
    pdf_file = models.FileField(upload_to='pdfs/', null=True)
    category = models.CharField(max_length=40, null=True)
    time_create = models.DateTimeField(
        auto_now=True, null=True)


class Deal (models.Model):
    id_deal = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    id_ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    id_seller = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='user_seller', on_delete=models.CASCADE)
    id_buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='user_buyer', on_delete=models.CASCADE)
    deal_date = models.DateTimeField
    status = models.CharField(max_length=40, null=True)
    status_location = models.CharField(max_length=40, null=True,default="The event has not yet occurred")
    reason = models.CharField(max_length=40, null=True)
    price = models.FloatField(null=True)
    time_create = models.DateTimeField(
        auto_now=True, null=True)
