from django.urls import path
from .views import index, apiOverview, user_Account, test_zillow_api

urlpatterns = [
    path("", index),
    path("about", index),
    path("account", index),
    path("testing", test_zillow_api)
]
