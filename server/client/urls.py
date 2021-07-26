from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("about", index),
    path("account", index),
    path("register", index),
    path("login", index),
]
