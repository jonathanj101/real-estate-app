from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer, PropertySerializer
from .models import User, Property

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


@api_view(["GET", "POST"])
def apiOverview(request):
    print("apioverview")
    if request.method == "POST":
        print(request)
        print(request.data)
        return Response("Hello world")
    return Response("get request")


@api_view(["GET"])
def user_Account(request):
    print("user account route")
    return Response("user accout route")


@api_view(["GET"])
def test_zillow_api(request):

    url = "https://zillow-com1.p.rapidapi.com/propertyExtendedSearch"

    querystring = {"location": "santa monica, ca", "home_type": "Houses"}

    headers = {
        'x-rapidapi-key': "d9c46d06bcmsh8f8d34a1e32e159p124447jsna5a4785d45eb",
        'x-rapidapi-host': "zillow-com1.p.rapidapi.com"
    }

    response = requests.get(url=url, headers=headers, params=querystring)
    resp = response.json()
    # print(resp)

    # print(response.text)
    return Response({"data": resp})


@api_view(["GET"])
def testing(request):
    data = {"address": "123 fort", "price": 5000, "property_type": "single family", "bathrooms": 5, "bedrooms": 5,
            "sqft": 5000, "zpid": 10032, "latitude": 50083.9, "longitude": 5000.5, "photo_main": "image-src.png"}
    property_model = Property(address=data["address"], price=data["price"], property_type=data["property_type"], bathrooms=data["bathrooms"], bedrooms=data["bedrooms"],
                              sqft=data["sqft"], zpid=data["zpid"], latitude=data["latitude"], longitude=data["longitude"], photo_main=data["photo_main"])
    property_model.save()
    queryset = Property.objects.all()
    print(queryset)

    return Response({"data": "nope"})
