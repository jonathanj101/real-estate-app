from django.urls import path
from .views import get_properties_data

urlpatterns = [
    path("show-properties", get_properties_data),
]
