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

headers = {
    'x-rapidapi-key': env("RAPIDAPI_KEY"),
    'x-rapidapi-host': env("RAPIDAPI_HOST")
}


@api_view(["GET"])
def search_properties(request, location):

    url = "{}/propertyExtendedSearch".format(MAIN_URL)

    querystring = {"location": location}

    request = requests.get(url=url, headers=headers, params=querystring)

    response = request.json()

    is_props = [prop for prop in response if prop == "props"]

    data = {}
    if is_props:
        data = {
            "props": response["props"],
            "status": 201
        }
    else:
        data = {
            "status": 500
        }

    return Response(data)


@api_view(["GET"])
def get_properties_data(request):
    url = "{}/propertyExtendedSearch".format(MAIN_URL)

    querystring = {"location": "New York, ny", "home_type": "Houses"}

    request = requests.get(url=url, headers=headers, params=querystring)
    response = request.json()

    return Response({"data": response["props"]})


@api_view(["POST"])
def add_property(request):

    USER_DETAIL = request.data

    USER = User.objects.filter(id=USER_DETAIL["userId"]).first()
    print(USER)
    ZPID_FILTER = Property.objects.filter(
        zpid=int(USER_DETAIL["zpid"]), user_id=USER.id).first()
    print(ZPID_FILTER)
    if ZPID_FILTER is None:
        property_model = Property(user_id=USER.id, address=USER_DETAIL["address"], price=USER_DETAIL["cost"], property_type=USER_DETAIL["propertyType"], bathrooms=USER_DETAIL["bathrooms"], bedrooms=USER_DETAIL["bedrooms"],
                                  lotAreaUnit=USER_DETAIL["lotAreaUnit"], lotAreaValue=USER_DETAIL["lotAreaUnitValue"], livingArea=USER_DETAIL["livingArea"], zpid=USER_DETAIL["zpid"], latitude=USER_DETAIL["latitude"], longitude=USER_DETAIL["longitude"], photo_main=USER_DETAIL["image"])

        property_model.save()

        return Response(201)
    else:
        return Response(500)


@api_view(["POST"])
def delete_property(request):
    USER_DETAIL = request.data

    USER = User.objects.filter(id=USER_DETAIL["userId"]).first()
    PROPERTY = Property.objects.filter(
        zpid=int(USER_DETAIL["zpid"]), user_id=USER.id).first()
    if USER and PROPERTY:
        PROPERTY.delete()
        return Response({"status": 201})
    return Response({"status": 500})


@api_view(["PUT"])
def favorites_properties(request):
    user_detail = request.data
    user = User.objects.filter(id=user_detail["userId"]).first()
    property_model = Property.objects.filter(
        user_id=user_detail["userId"]).all()
    print(property_model)
    serializer = PropertySerializer(property_model, many=True)
    return Response({"data": serializer.data})


@api_view(["POST"])
def get_virtual_tour_url(request):
    zpid = int(request.data["zpid"])

    url = "{}/property".format(MAIN_URL)

    querystring = {"zpid": zpid}

    request = requests.get(url=url, headers=headers, params=querystring)
    response = request.json()

    virtual_tour_url = response["resoFacts"]["virtualTour"]

    return Response({"data": virtual_tour_url})


@api_view(["POST"])
def get_property_images(request):
    url = "{}/images".format(MAIN_URL)

    querystring = {"zpid": int(request.data["zpid"])}

    request = requests.get(
        url=url, headers=headers, params=querystring)
    response = request.json()

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

        response = {
            "id": USER.id,
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
    USER = User.objects.filter(username=USER_DETAIL["username"]).first()
    IS_AUTHENTICATED = USER and check_password(
        USER_DETAIL["password"], USER.password)
    if IS_AUTHENTICATED:
        response = {
            "user_id": USER.id,
            "message": "You have signed in successfully! You will be redirected to Home page shortly!",
            "status": 201
        }
        return Response(response)
    else:
        response = {
            "message": "That username/password is not recognizable by our system! Try again or create an account!",
            "status": 400
        }
    return Response(response)


@api_view(["PUT"])
def verify_user(request):
    USER_DETAIL = request.data
    USER = User.objects.filter(id=USER_DETAIL["userId"]).first()
    if (USER):
        response = {
            "status": 201,
            "username": USER.username
        }
        return Response(response)
    response = {
        "status": 500
    }
    return Response(response)
