from django.urls import path

from . import views

urlpatterns = [
    path("", views.index_view, name="home"),
    path("getpoint/", views.api_thermal_datapoint, name="get_thermal_point")
]
