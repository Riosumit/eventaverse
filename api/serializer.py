from rest_framework import serializers
from .models import User, Event

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "phone", "password"]

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "event_name", "data", "time", "location", "image", "is_liked"]