from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import User, Event
from .serializer import UserSerializer, EventSerializer
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
# Create your views here.
@csrf_exempt
def userListView(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        jsonData = JSONParser().parse(request)
        serializer = UserSerializer(data=jsonData)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        else:
            return JsonResponse(serializer.errors)

@csrf_exempt 
def UserLogin(request):
    if request.method == 'POST':
        jsonData = JSONParser().parse(request)
        users = User.objects.filter(email=jsonData['email'], password=jsonData['password'])
        if users:
            print(request.user)
            request.session["loggedin"] = True
            return JsonResponse({"found":"true", "msg":""})
        else:
            return JsonResponse({"found":"false", "msg":"Incorrect Email or Password"})
        
def UserLogout(request):
    try:
        del request.session["loggedin"]
        return JsonResponse({"msg":"LoggedOut Succesfully"})
    except:
        return JsonResponse({"msg":"LoggedOut Unsuccesful"})
        
def IsUserLogin(request):
    try:
        loggedin = request.session["loggedin"]
    except:
        loggedin = False
    return JsonResponse({"loggedin":loggedin})
    
@csrf_exempt 
def UserSignUp(request):
    if request.method == 'POST':
        jsonData = JSONParser().parse(request)
        serializer = UserSerializer(data=jsonData)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"status": "success", "msg":"Registered succesfully"}, safe=False)
        else:
            return JsonResponse(serializer.errors)
        
class AddEvent(APIView):
    parser_classes = (MultiPartParser, FormParser,)
    def post(self, request, format=None):
        # try:
        #     loggedin = request.session["loggedin"]
        # except:
        #     loggedin = False
        # if not loggedin :
        #     return JsonResponse({"msg": "Not Loggedin"}, safe=False)
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"status":"success", "msg": "Event Added Succesfully"}, safe=False)
        else:
            return JsonResponse(serializer.errors)
        
class ShowEvent(APIView):
    def get(self, request, format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return JsonResponse(serializer.data, safe=False)
    
@csrf_exempt 
def LikeEvent(request):
    if request.method == 'PUT':
        jsonData = JSONParser().parse(request)
        event = Event.objects.get(pk=jsonData['id'])
        serializer = EventSerializer(event, data=jsonData)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"status": "success"}, safe=False)
        else:
            return JsonResponse(serializer.errors)