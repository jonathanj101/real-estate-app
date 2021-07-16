from django.urls import path
from .views import get_properties_data, add_property, favorites_properties, testing_virtual_tour

urlpatterns = [
    path("show-properties", get_properties_data),
    path("add_property", add_property),
    path("favorites-properties", favorites_properties),
    path("test_virtual", testing_virtual_tour),
]
