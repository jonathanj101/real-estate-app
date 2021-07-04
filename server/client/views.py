from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

import requests


# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


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
    return JsonResponse({"data": resp})
