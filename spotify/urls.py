from django.urls import path
from .views import AuthUrl, spotify_callback, isAuthenticated


urlpatterns = [
    path("get-auth-url", AuthUrl.as_view()),
    path("redirect", spotify_callback),
    path("is_auth", isAuthenticated.as_view())
]