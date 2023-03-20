from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView, status
from rest_framework.response import Response
from requests import Request, post
from .util import update_or_create_user_tokens,check_for_session, is_spotify_auth, execute_spotify_api_request
from api.models import Room


# Create your views here.
class AuthUrl(APIView):
    def get(self, request, format=None):
        ## things we want from spotify, spotify-dev site
        scopes = "user-read-playback-state user-modify-playback-state user-read-currently-playing"

        ## prepare the url for the login of the user
        url = Request("GET", "https://accounts.spotify.com/authorize", params={
            "scope" : scopes,
            "response_type" : "code",
            "redirect_uri" : REDIRECT_URI,
            "client_id" : CLIENT_ID,
        }).prepare().url


        return Response({"url" : url}, status = status.HTTP_200_OK)


def spotify_callback(request, format= None):
    code = request.GET.get("code")
    error = request.GET.get("error")


    response = post("https://accounts.spotify.com/api/token", data={
        'grant_type': 'authorization_code',
        'code': code,
        "redirect_uri" : REDIRECT_URI,
        "client_id" : CLIENT_ID,
        "client_secret" : CLIENT_SECRET
    }).json()

    access_token = response.get("access_token")
    token_type = response.get("token_type")
    refresh_token = response.get("token_type")
    expires_in = response.get("expires_in")
    error = response.get("error")

    check_for_session(request)

    update_or_create_user_tokens(request.session.session_key,access_token, token_type, expires_in, refresh_token)

    ## redirect to front, put name of app and than page you want to go to frontend:room ( for the room page)
    return redirect("frontend:home")


class isAuthenticated(APIView):
    def get(self, request, format=None):
        is_auth = is_spotify_auth(self.request.session.session_key)
        return Response({"status" : is_auth}, status=status.HTTP_200_OK)

class CurrentSong(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get("room_code")
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({"status" : "Not in a Room"}, status=status.HTTP_400_BAD_REQUEST)
        host = room.host
        endpoint = "player/currently-playing"
        response = execute_spotify_api_request(host, endpoint)

        return Response(response, status=status.HTTP_200_OK)