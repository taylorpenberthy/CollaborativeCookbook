import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')
django.setup()
from recipes.models import Ingredient, Recipe, CustomUser
from recipes.serializers import IngredientSerializer, RecipeSerializer, CustomUserSerializer

# Seed Ingredients

# Seed Users
user_data = [
    {"username": "yesse", "password": "password123"},
    {"username": "john_doe", "password": "password123"},
    {"username": "jane_doe", "password": "password123"},
]

user_instances = []

for user in user_data:
    serializer = CustomUserSerializer(data=user)
    if serializer.is_valid():
        user_instance = serializer.save()
        user_instances.append(user_instance)
    else:
        print(f"Failed to create user {user['username']}: {serializer.errors}")

ingredient_data = [
    {"name": "Tri Tip", "image": "ingredients/5281D226-7D5A-4B22-80BF-39694B5A9F28.JPG"},
    {"name": "Mexican Rice", "image": "ingredients/mexican-rice-social.jpg"},
    {"name": "Guacamole", "image": "ingredients/guacamole-foto-heroe.jpg"},
    {"name": "Chicken Thighs", "image": ""},
    {"name": "Scallions", "image": "ingredients/scallions.jpeg"},
    {"name": "Potatoes", "image": "ingredients/potatoes.webp"},
    {"name": "Cherry Tomatoes", "image": "ingredients/Tomates_cerises_Luc_Viatour.jpg"},
    {"name": "Garlic Powder", "image": "ingredients/garlic.png"},
    {"name": "Onion Powder", "image": "ingredients/onionpow.jpeg"},
    {"name": "Capers", "image": "ingredients/capers.png"},
    {"name": "Lemon", "image": "ingredients/lemon.jpeg"},
]

for ingredient in ingredient_data:
    serializer = IngredientSerializer(data=ingredient)
    if serializer.is_valid():
        serializer.save()
    else:
        print(f"Failed to create ingredient {ingredient['name']}: {serializer.errors}")

# Seed Recipes
recipe_data = [
    {
        "name": "Yesse's Famous Burritos",
        "ingredients": ["Tri Tip", "Mexican Rice", "Guacamole"],
        "image": "recipes/5281D226-7D5A-4B22-80BF-39694B5A9F28.JPG",
    },
    {
        "name": "Chicken Thighs with Potatoes and Scallions",
        "ingredients": ["Chicken Thighs", "Scallions", "Potatoes", "Cherry Tomatoes", "Garlic Powder", "Onion Powder", "Capers", "Lemon"],
        "image": "recipes/FE3D5C7C-79F5-4CC8-8958-8882E36850FB.JPG",
    },
]

for recipe in recipe_data:
    ingredient_ids = [Ingredient.objects.get(name=name).id for name in recipe['ingredients']]
    created_by = user_instances[0]  # Assign the first user for demonstration
    recipe_payload = {
        "name": recipe['name'],
        "image": recipe['image'],
        "ingredients": ingredient_ids,
        "created_by": created_by.id,
    }
    serializer = RecipeSerializer(data=recipe_payload)
    if serializer.is_valid():
        serializer.save()
    else:
        print(f"Failed to create recipe {recipe['name']}: {serializer.errors}")