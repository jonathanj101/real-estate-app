from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status

import requests

# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
