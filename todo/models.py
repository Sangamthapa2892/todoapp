from django.db import models
from django.utils import timezone
# Create your models here.
class Todolist(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_delete = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['-created_at']