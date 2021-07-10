from django.urls import path
from .views import get_properties_data

urlpatterns = [
    path("testing", get_properties_data),
]
