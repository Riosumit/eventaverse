from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .serializers import UserSerializer, EventSerializer, LikeSerializer
from .models import Event, Like
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return True

class UserSignup(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            if User.objects.filter(username=email).exists():
                return Response({"success": False, "msg": "Email already exists"})
            serializer.save()
            return Response({"success": True, "msg": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    def post(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({"success": True, "msg": "Login successful", "token":token.key}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "msg": "Invalid email or password"})

class UserLogout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({"success": True, "msg": "Logout successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "msg": "User is not logged in"})

class EventList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def get(self, request):
        events = Event.objects.all()
        if request.user.is_authenticated:
            serializer = EventSerializer(events, many=True, context={'user': request.user})
        else:
            serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyEvent(APIView):
    def get(self, request):
        events = Event.objects.filter(user=request.user)
        serializer = EventSerializer(events, many=True, context={'user': request.user})
        return Response(serializer.data)

class MyLikedEvents(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        likes = Like.objects.filter(user=request.user)
        events = []
        for like in likes:
            event_serializer = EventSerializer(like.event, context={'user':request.user})
            events.append(event_serializer.data)
        return Response({"data": events})

class LikeEvent(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return None

    def get(self, request, pk):
        event = self.get_object(pk)
        if not event:
            return Response({"success": False, "msg": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            like = Like.objects.get(user=request.user, event=event)
            # If the user has already liked the event, return a message
            return Response({"success": False, "msg": "You have already liked this event"}, status=status.HTTP_400_BAD_REQUEST)
        except Like.DoesNotExist:
            # If the user hasn't liked the event yet, increment the likes count
            event.likes += 1
            event.save()
            # Create a new like object for the user and event
            Like.objects.create(user=request.user, event=event)
            return Response({"success": True, "msg": "Event liked successfully"}, status=status.HTTP_200_OK)

class UnlikeEvent(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return None

    def get(self, request, pk):
        event = self.get_object(pk)
        if not event:
            return Response({"success": False, "msg": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            like = Like.objects.get(user=request.user, event=event)
            event.likes -= 1
            event.save()
            like.delete()
            return Response({"success": True, "msg": "Event unliked successfully"}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            return Response({"success": False, "msg": "You have not liked this event"}, status=status.HTTP_400_BAD_REQUEST)
