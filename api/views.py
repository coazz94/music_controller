from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
# Here we write end point /Home etx

## make with Rest_framework a queryset, and a serializer class
class RoomView(generics.ListAPIView):
    # simply return all objects
    queryset = Room.objects.all()
    # how do i convert this to a object, see the class
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwargs = "code"



    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwargs)
        if code != None:
            room = Room.objects.filter(code = code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                ## TODO Check here if it ever matches the user, because we are comparing a name with a session key
                ## VIDEO 7 at minute 14
                data["is_host"] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({"Room not Found" : "Invalid Room Code"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"Bad Request" : "Code Parameter missing"}, status=status.HTTP_404_NOT_FOUND)


class CreateRoomView(APIView):

    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        ## if the data we get from the post request is valid get the info
        if serializer.is_valid():
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            host = self.request.session.session_key
            ## see if the room already exits by filtering the object
            queryset = Room.objects.filter(host=host)
            ## If exists than update the values of the room
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                ## update fields
                room.save(update_fields=["votes_to_skip", "guest_can_pause"])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            ## create a new room
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        ## Return a response of the data that was created as sa json object (which we get from the serializer, and return a status)
        return Response({"Bad Request" : "invalid"}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoom(APIView):



    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        code = request.data.get("code")
