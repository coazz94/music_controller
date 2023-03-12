from django.db import models
import string
import random


def generate_unique_code():
    length = 6

    while True:
        # Will return a random code of k length
        code = "".join(random.choices(string.ascii_uppercase, k=length))
        ## if the code is in one Room Object continue, if it is unique exit loop
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    # Null means that it must be field, and the default ist false
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    # will automatically add the date when the room is created
    created_at = models.DateTimeField(auto_now_add=True)
