from django.urls import path
from .views import get_properties_data, add_property, favorites_properties, get_virtual_tour_url, get_property_images, google_api_key, registration

urlpatterns = [
    path("show-properties", get_properties_data),
    path("add_property", add_property),
    path("favorites-properties", favorites_properties),
    path("test_virtual", get_virtual_tour_url),
    path("get-images", get_property_images),
    path("api-key", google_api_key),
    path("registration", registration)
]
