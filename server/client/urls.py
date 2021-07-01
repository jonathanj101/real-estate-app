from django.urls import path
from .views import index, apiOverview

urlpatterns = [
    path("", index),
    path("about", index),
    path("example", apiOverview),
]
