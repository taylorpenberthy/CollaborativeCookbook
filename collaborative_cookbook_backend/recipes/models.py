from django.db import models
from django.contrib.auth.models import AbstractUser
    
class CustomUser(AbstractUser):
    pass

class Ingredient(models.Model):
    name = models.CharField(max_length=200)

class Recipe(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(default='')
    instructions = models.TextField(default='')
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)
    ingredients = models.ManyToManyField(Ingredient)
    created_by = models.ForeignKey(CustomUser, related_name='my_recipes', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    