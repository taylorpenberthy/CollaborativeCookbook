import boto3
import os
from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from .models import Recipe, Ingredient
from .serializers import RecipeSerializer, IngredientSerializer

class GeneratePresignedUrl(APIView):
    def get(self, request):
        s3_client = boto3.client(
            's3',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
            region_name='us-east-2',
        )
        
        file_name = request.GET.get('file_name')
        file_type = request.GET.get('file_type')
        
        presigned_url = s3_client.generate_presigned_url(
            'put_object',
            Params={'Bucket': 'collabcook',
                    'Key': file_name,
                    'ContentType': file_type},
            ExpiresIn=3600
        )
        
        return Response({"presigned_url": presigned_url})
    
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