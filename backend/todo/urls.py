from django.urls import path
from .views import TodoAPI

urlpatterns = [
    path('todos/', TodoAPI.as_view()),
    path('todos/<int:id>/', TodoAPI.as_view()),
]