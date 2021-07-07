from django.db import models

# Create your models here.

# need to modify user model


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


#
# class Property(models.Model):
#     address =  # need to add model field
#     price =  # need to add model field
#     property_type =  # need to add model field
#     bathrooms =  # need to add model field
#     bedrooms =  # need to add model field
#     sqft =  # need to add model field
#     zpid =  # need to add model field
#     latitude =  # need to add model field
#     longitude =  # need to add model field
