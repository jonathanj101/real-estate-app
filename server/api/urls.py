from django.urls import path
from .views import get_properties_data, add_property, favorites_properties, get_virtual_tour_url, get_property_images, google_api_key, registration, log_in, verify_user, delete_property, search_properties

urlpatterns = [
    path("show-properties", get_properties_data),
    path("add_property", add_property),
    path("favorites-properties", favorites_properties),
    path("get-virtual-tour", get_virtual_tour_url),
    path("get-images", get_property_images),
    path("api-key", google_api_key),
    path("registration", registration),
    path("log-in", log_in),
    path("verify-user", verify_user),
    path("delete-property", delete_property),
    path("search/<str:location>", search_properties)
]
