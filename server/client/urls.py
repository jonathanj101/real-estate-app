from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("account", index),
    path("about", index),
]
