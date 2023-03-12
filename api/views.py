from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room
# Create your views here.
# Here we write end point /Home etx

## make with Rest_framework a queryset, and a serializer class
class RoomView(generics.ListAPIView):
    # simply return all objects
    queryset = Room.objects.all()
    # how do i convert this to a object, see the class
    serializer_class = RoomSerializer