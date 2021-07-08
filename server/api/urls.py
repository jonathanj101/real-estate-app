from django.urls import path
from .views import testing, test_zillow_api

urlpatterns = [
    path("testing", test_zillow_api),
    path("test", testing)
]
