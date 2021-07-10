from django.urls import path
from .views import testing, get_properties_data

urlpatterns = [
    path("testing", get_properties_data),
    path("test", testing)
]
