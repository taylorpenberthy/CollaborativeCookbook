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
    image = models.CharField(max_length=500, blank=True, null=True, default='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg')
    ingredients = models.ManyToManyField(Ingredient, through='recipes.RecipeIngredient')
    created_by = models.ForeignKey(CustomUser, related_name='my_recipes', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.CharField(max_length=50, blank=True, null=True, default="1 cup")