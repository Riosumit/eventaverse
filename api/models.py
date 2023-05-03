from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=11)
    password = models.CharField(max_length=50)

class Event(models.Model):
    event_name = models.CharField(max_length=60)
    data = models.CharField(max_length=2000)
    time = models.DateTimeField()
    location = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images", blank=True)
    is_liked = models.BooleanField()