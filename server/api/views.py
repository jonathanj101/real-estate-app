import requests
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer, PropertySerializer
from .models import User, Property

import environ
import os

env = environ.Env()

environ.Env.read_env()

MAIN_URL = "https://zillow-com1.p.rapidapi.com"


@api_view(["GET"])
def user_Account(request):
    print("user account route")
    return Response("user accout route")


@api_view(["GET"])
def get_properties_data(request):
    url = "{}/propertyExtendedSearch".format(MAIN_URL)

    querystring = {"location": "santa monica, ca", "home_type": "Houses"}

    headers = {
        'x-rapidapi-key': env("RAPIDAPI_KEY"),
        'x-rapidapi-host': env("RAPIDAPI_HOST")
    }

    response = requests.get(url=url, headers=headers, params=querystring)
    resp = response.json()

    def map_response(response):
        properties_data = []
        for key in response:
            data = {
                "address": key["address"],
                "price": key["price"],
                "property_type": key["propertyType"],
                "bathrooms": key["bathrooms"],
                "bedrooms": key["bedrooms"],
                "lotAreaUnit": key["lotAreaUnit"],
                "lotAreaValue": key["lotAreaValue"],
                "zpid": key["zpid"],
                "latitude": key["latitude"],
                "longitude": key["longitude"],
                "image": key["imgSrc"],
            }
            properties_data.append(data)
        return properties_data

    properties = map_response(resp["props"])
    return Response({"data": properties})


@api_view(["POST"])
def add_property(request):

    user_data = request.data

    user = User.objects.filter(id=1).first()

    property_model = Property(user_id=user.id, address=user_data["address"], price=user_data["cost"], property_type=user_data["propertyType"], bathrooms=user_data["bathrooms"], bedrooms=user_data["bedrooms"],
                              lotAreaUnit=user_data["lotAreaUnit"], lotAreaValue=user_data["lotAreaUnitValue"], zpid=user_data["zpid"], latitude=user_data["latitude"], longitude=user_data["longitude"], photo_main=user_data["image"])

    property_model.save()

    return Response({"data": "success"})


@api_view(["GET"])
def favorites_properties(request):
    user = User.objects.filter(id=1).first()
    property_model = Property.objects.filter(user_id=1).all()
    serializer = PropertySerializer(property_model, many=True)
    return Response({"data": serializer.data})


@api_view(["POST"])
def testing_virtual_tour(request):
    zpid = request.data["zpid"]

    url = "{}/property".format(MAIN_URL)
    headers = {
        "x-rapidapi-key": env("RAPIDAPI_KEY"),
        "x-rapidapi-host": env("RAPIDAPI_HOST")
    }

    querystring = {"zpid": zpid}

    request = requests.get(url=url, headers=headers, params=querystring)
    response = request.json()

    virtual_tour_url = response["resoFacts"]["virtualTour"]

    return Response({"data": virtual_tour_url})
