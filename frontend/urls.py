from django.urls import include, path
from .views import index

## for the redirect in the spotify App, also added name="" to the redirects now
app_name = "frontend"

urlpatterns = [
    path("", index, name="home"),
    path("join", index),
    path("create", index),
    path("room/<str:roomCode>", index),
]