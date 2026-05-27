from django.urls import path

from .views import upload_csv, records

urlpatterns = [
    path('upload/', upload_csv),
    path('records/', records),
]