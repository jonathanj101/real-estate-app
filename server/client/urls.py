from django.urls import path
from .views import index, apiOverview, user_Account

urlpatterns = [
    path("", index),
    path("about", apiOverview),
    path("account", user_Account)
]
