from django.contrib import admin
from django.urls import path
from .views import UserLogin, UserSignUp, userListView, IsUserLogin, UserLogout, AddEvent, ShowEvent, LikeEvent

urlpatterns = [
    path('user', userListView),
    path('login', UserLogin),
    path('logout', UserLogout),
    path('islogin', IsUserLogin),
    path('signup', UserSignUp),
    path('like', LikeEvent),
    path('addevent', AddEvent.as_view()),
    path('event', ShowEvent.as_view()),
]
