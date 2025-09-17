from django.urls import path
from . views import *
urlpatterns = [
    path('', index, name='index'),
    path('edit-todo/<int:id>/', edit_todo, name='edit_todo'),
    path('delete/<int:todo_id>/', delete_todo, name='delete_todo'),
    path('toggle/<int:todo_id>/', toggle_todo, name='toggle_todo'),
    path("health/", health)

]