from django.db import models
from datetime import datetime


class User(models.Model):
    first_name = models.CharField(max_length=20, default="", null=False)
    last_name = models.CharField(max_length=20, default="", null=False)
    username = models.CharField(
        max_length=20, default="", null=False, unique=True)
    password = models.CharField(
        max_length=20, default="", null=False, unique=False)
    email = models.EmailField(max_length=50, null=False, unique=True)

    def __str__(self):
        return self.username


class Property(models.Model):
    address = models.CharField(max_length=100, null=False, unique=True)
    price = models.IntegerField()
    property_type = models.CharField(max_length=30, null=False)
    bathrooms = models.IntegerField()
    bedrooms = models.IntegerField()
    lotAreaUnit = models.CharField(max_length=20, default="", null=False)
    lotAreaValue = models.IntegerField()
    zpid = models.IntegerField()
    latitude = models.IntegerField()
    longitude = models.IntegerField()
    photo_main = models.ImageField(upload_to="static/images/%Y/%m/%d/")
    photo_1 = models.ImageField(
        upload_to="static/images/%Y/%m/%d/", blank=True)
    photo_2 = models.ImageField(
        upload_to="static/images/%Y/%m/%d/", blank=True)
    photo_3 = models.ImageField(
        upload_to="static/images/%Y/%m/%d/", blank=True)
    photo_4 = models.ImageField(
        upload_to="static/images/%Y/%m/%d/", blank=True)
    photo_5 = models.ImageField(
        upload_to="static/images/%Y/%m/%d/", blank=True)
    photo_5 = models.ImageField(
        upload_to="static/images/%Y/%m/%d/", blank=True)
    list_date = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return f"Property ('{self.address}','{self.price}', '{self.property_type}', '{self.bathrooms}', '{self.bedrooms}, '{self.sqft}', '{self.zpid}', '{self.latitude}', '{self.longitude}', '{self.photo_main}', '{self.list_date}')"
