from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Ingredient, Recipe, RecipeIngredient

# CustomUser Serializer
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name',)

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ('ingredient', 'amount')
        
class RecipeSerializer(serializers.ModelSerializer):
    ingredients = serializers.ListField(child=serializers.DictField(), required=True)

    class Meta:
        model = Recipe
        fields = ('name', 'description', 'instructions', 'image', 'created_by', 'ingredients', 'recipe_type', 'difficulty')

    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        
        for ingredient_data in ingredients_data:
            RecipeIngredient.objects.create(
                recipe=recipe,
                ingredient=Ingredient.objects.get(id=ingredient_data['ingredient']),
                amount=ingredient_data['amount']
            )
        return recipe
