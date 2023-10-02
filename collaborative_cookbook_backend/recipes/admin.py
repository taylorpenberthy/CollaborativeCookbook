from recipes.models import CustomUser, Recipe, Ingredient, RecipeIngredient
from django.contrib import admin


class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    extra = 1  # Number of empty forms displayed

class RecipeAdmin(admin.ModelAdmin):
    inlines = [RecipeIngredientInline]

admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient)
admin.site.register(CustomUser)
admin.site.register(RecipeIngredient)