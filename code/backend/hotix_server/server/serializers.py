from rest_framework import serializers
from server.models import *
from django.contrib.auth.models import User


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CurrentAccountSerializer(serializers.ModelSerializer):
    user = CurrentUserSerializer()
    class Meta:
        model = Account
        fields = ['image','user']

    def get_picture_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        else:
            return None    


class EventSerializer (serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class TicketSerializer (serializers.ModelSerializer):
    id_event = EventSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'


class DealSerializer (serializers.ModelSerializer):
    class Meta:
        model = Deal
        fields = '__all__'
