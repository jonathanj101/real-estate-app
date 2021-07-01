from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import UserSerializer
from .models import User

# Create your views here.


class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # print(request.data)

    # def post(self, request, format=None):
    #     if not self.request.session.exists(self.request.session.session_key()):
    #         self.request.session.create()
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():
