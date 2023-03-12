from rest_framework import serializers
from .models import Room

## Take a object and serialize it in a Room Object
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        # id will be created automatically, because every Model has a unique id
        fields = ("id", "code", "host", "guest_can_pause", "votes_to_skip", "created_at")


## this is gonna serialize a request, get the data from the request to get it in a python format
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("guest_can_pause", "votes_to_skip")
