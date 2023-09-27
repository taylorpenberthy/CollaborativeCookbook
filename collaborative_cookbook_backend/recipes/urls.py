from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('recipes/', views.RecipeView.as_view()),
    path('ingredients/', views.IngredientView.as_view())
]