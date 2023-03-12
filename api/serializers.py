from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        # id will be created automatically, because every Model has a unique id
        fields = ("id", "code", "host", "guest_can_pause", "votes_to_skip", "created_at")



