from recipes.models import CustomUser, Recipe, Ingredient
from django.contrib import admin

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Recipe)
admin.site.register(Ingredient)