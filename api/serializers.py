from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event, Like

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['email'],**validated_data)
        return user
    
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['user', 'event']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context.get('user')
        event = Event.objects.create(user=user, **validated_data)
        return event

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user = self.context.get('user','')
        if user:
            if isinstance(instance, list):
                for event_data in representation:
                    if(Like.objects.filter(user=user, event=event_data['id'])):
                        event_data['is_like'] = True
                    else:
                        event_data['is_like'] = False
            else:
                if(Like.objects.filter(user=user, event=representation['id'])):
                    representation['is_like'] = True
                else:
                    representation['is_like'] = False
        return representation
    