import requests
from django.contrib.auth.hashers import make_password, check_password
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
def get_virtual_tour_url(request):
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


@api_view(["POST"])
def get_property_images(request):
    # property_model = Property.objects.filter(user_id=1).all()
    # property_zpid = [zpid.zpid for zpid in property_model]

    print(request.data)

    url = "{}/images".format(MAIN_URL)

    headers = {
        "x-rapidapi-key": env("RAPIDAPI_KEY"),
        "x-rapidapi-host": env("RAPIDAPI_HOST")
    }
    querystring = {"zpid": request.data["zpid"]}

    request = requests.get(
        url=url, headers=headers, params=querystring)
    response = request.json()

    # def map_zpid(arr):
    #     images = []
    #     for x in arr:
    #         querystring = {"zpid": x}
    #         print(querystring)
    #         request = requests.get(
    #             url=url, headers=headers, params=querystring)
    #         response = request.json()
    #         images.append(response["images"])
    #     return images

    # arr_images = map_zpid(property_zpid)

    # return Response({"data": arr_images})
    return Response({"data": response["images"]})


@api_view(["GET"])
def google_api_key(request):
    api_key = env("GOOGLE_API_KEY")
    return Response({"data": api_key})


@api_view(["POST"])
def registration(request):
    USER_DETAIL = request.data
    username = User.objects.filter(username=USER_DETAIL["username"]).first()
    registered = username is None

    hashed_password = make_password(
        USER_DETAIL["password"], salt=None, hasher="default")

    if registered:
        hashed_password = make_password(
            USER_DETAIL["password"], salt=None, hasher='default')
        USER = User(first_name=USER_DETAIL["firstName"], last_name=USER_DETAIL["lastName"],
                    username=USER_DETAIL["username"], password=hashed_password, email=request.data["email"])
        USER.save()
        hashed_id = make_password(str(USER.id), salt=None, hasher="default")

        response = {
            "id": hashed_id,
            "message": "Success! You will be redirected to the Home Page shortly!",
            "status": 200
        }
        return Response(response)
    else:
        response = {
            "message": "Looks like that username already exist within our database! Please try selecting different username!",
            "status": 500
        }
        return Response(response)


@api_view(["PUT"])
def log_in(request):
    USER_DETAIL = request.data
    print(USER_DETAIL)
    USER = User.objects.filter(username=USER_DETAIL["username"]).first()
    IS_AUTHENTICATED = USER and check_password(
        USER.password, USER_DETAIL["password"])
    if IS_AUTHENTICATED:
        HASHED_ID = make_password(str(USER.id), salt=None, hasher="default")
        response = {
            "user_id": HASHED_ID,
            "message": "You have signed in successfully! You will be redirected to Home page shortly!",
            "status": 201
        }
        return Response(response)
    else:
        response = {
            "message": "That username/password is not recognizable by our system! Try again or create an account!",
            "status": 400
        }
        return
