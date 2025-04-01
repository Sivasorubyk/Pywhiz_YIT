from django.urls import path
from .views import run_code  # Import the function-based view

urlpatterns = [
    path('run-code/', run_code, name='run_code'),  # Use the function directly
]
