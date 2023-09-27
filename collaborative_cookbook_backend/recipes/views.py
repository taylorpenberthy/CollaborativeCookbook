from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from .models import Recipe, Ingredient
from .serializers import RecipeSerializer, IngredientSerializer

class RecipeView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    parser_classes = [MultiPartParser, FormParser]


    def get_queryset(self):
        # Prefetch the related ingredients to avoid the ManyRelatedManager issue
        return Recipe.objects.prefetch_related('ingredients').all()

    def put(self, request, *args, **kwargs):
        try:
            recipe = Recipe.objects.get(pk=kwargs.get('pk'))
        except Recipe.DoesNotExist:
            return Response({'error': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = RecipeSerializer(recipe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class IngredientView(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer
    parser_classes = [MultiPartParser, FormParser]
    queryset = Ingredient.objects.all()