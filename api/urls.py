from django.contrib import admin
from django.urls import path
from .views import UserLogin, UserSignup, UserLogout, EventList, MyEvent, LikeEvent, UnlikeEvent, MyLikedEvents

urlpatterns = [
    path('login', UserLogin.as_view(), name='user_login'),
    path('logout', UserLogout.as_view(), name='user_logout'),
    path('signup', UserSignup.as_view(), name='user_signup'),
    path('events', EventList.as_view(), name='event_list'),
    path('myevents', MyEvent.as_view(), name='my_event'),
    path('events/like', MyLikedEvents.as_view(), name='my_liked_event'),
    path('events/<int:pk>/like', LikeEvent.as_view(), name='like_event'),
    path('events/<int:pk>/unlike', UnlikeEvent.as_view(), name='unlike_event'),
]