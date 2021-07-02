from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


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
