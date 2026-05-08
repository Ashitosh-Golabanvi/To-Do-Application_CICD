import json
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Todo

@method_decorator(csrf_exempt, name='dispatch')
class TodoAPI(View):

    def get(self, request):
        todos = list(Todo.objects.values())
        return JsonResponse(todos, safe=False)

    def post(self, request):
        data = json.loads(request.body)
        todo = Todo.objects.create(title=data.get("title"))
        return JsonResponse({"id": todo.id, "message": "created"})

    def put(self, request, id):
        data = json.loads(request.body)
        todo = Todo.objects.get(id=id)
        todo.completed = data.get("completed", todo.completed)
        todo.save()
        return JsonResponse({"message": "updated"})

    def delete(self, request, id):
        Todo.objects.get(id=id).delete()
        return JsonResponse({"message": "deleted"})