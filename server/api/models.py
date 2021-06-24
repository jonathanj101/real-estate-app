from django.db import models

# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=20, default="", null=False)
    last_name = models.CharField(max_length=20, default="", null=False)
    username = models.CharField(
        max_length=20, default="", null=False, unique=True)
    password = models.CharField(
        max_length=20, default="", null=False, unique=False)
    email = models.EmailField(max_length=50, null=False, unique=True)
