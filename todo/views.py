from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.shortcuts import get_object_or_404, redirect

from .models import Todolist
# Create your views here.
def index(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        Todolist.objects.create(name=name)
    filter_type = request.GET.get('filter')

    if filter_type:
        request.session['selected_filter'] = filter_type
    else:
        filter_type = request.session.get('selected_filter', 'all')

    if filter_type == 'active':
        todos = Todolist.objects.filter(is_active=True)
    elif filter_type == 'completed':
        todos = Todolist.objects.filter(is_active=False)
    else:
        todos = Todolist.objects.all()
    context = {
        'todos': todos,
        'current_filter': filter_type,
        'total_count':todos.count(),
    }
    return render(request, "todoapp/index.html", context)

def toggle_todo(request, todo_id):
    if request.method == 'POST':
        todo = get_object_or_404(Todolist, id=todo_id)
        todo.is_active = not todo.is_active  # Toggle active status
        todo.save()
    return redirect('index')

def edit_todo(request, id):
    todo = get_object_or_404(Todolist, id=id)
    if request.method == 'POST':
        name = request.POST.get('name', '').strip().capitalize()
        if name:
            todo.name = name
            todo.save()
    return redirect('index')

def delete_todo(request, todo_id):
    if request.method == 'POST':
        todo = get_object_or_404(Todolist, id=todo_id)
        todo.delete()
    return redirect('index')

from django.http import HttpResponse
def health(request):
    return HttpResponse("App is running!")
