from django.urls import path
from todo.views import TodoAPI

urlpatterns = [
    path('api/todos/', TodoAPI.as_view()),
    path('api/todos/<int:id>/', TodoAPI.as_view()),
]