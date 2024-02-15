from django.db import models
from django.contrib.auth.models import AbstractUser
    
class CustomUser(AbstractUser):
    pass

class Ingredient(models.Model):
    name = models.CharField(max_length=200)

class Recipe(models.Model):
    RECIPE_TYPE_CHOICES = (
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
        ('Dessert', 'Dessert'),
        ('Snack', 'Snack'),
        ('Drink', 'Drink'),
        ('Appetizer', 'Appetizer'),
        ('Side', 'Side'),
        ('Other', 'Other'),
    )
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(default='')
    instructions = models.TextField(default='')
    image = models.CharField(max_length=500, blank=True, null=True, default='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg')
    ingredients = models.ManyToManyField(Ingredient, through='recipes.RecipeIngredient')
    created_by = models.ForeignKey(CustomUser, related_name='my_recipes', on_delete=models.CASCADE)
    difficulty = models.IntegerField(default=1, choices=[(1, 'One Hat'), (2, 'Two Hats'), (3, 'Three Hats'), (4, 'Four Hats'), (5, 'Five Hats')], null=True, blank=True)
    recipe_type = models.CharField(max_length=50, choices=RECIPE_TYPE_CHOICES, default='Other', null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.CharField(max_length=50, blank=True, null=True, default="1 cup")
