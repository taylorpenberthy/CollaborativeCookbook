import boto3
import io
import os
import graphene

from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload

from django.contrib.auth import get_user_model

from recipes.models import Recipe, Ingredient, RecipeIngredient
from recipes.serializers import RecipeSerializer, IngredientSerializer
from django.core.files.base import ContentFile
import base64
from django.core.files.uploadedfile import InMemoryUploadedFile


class CustomUserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "first_name", "last_name")

class RecipeIngredientType(DjangoObjectType):
    class Meta:
        model = RecipeIngredient
        fields = ("ingredient", "amount")

class RecipeType(DjangoObjectType):
    recipe_ingredients = graphene.List(RecipeIngredientType)

    class Meta:
        model = Recipe
        fields = ("id", "name", "ingredients", "created_by", "description", "recipe_type", "instructions", "image", "difficulty")

    created_by = graphene.Field(lambda: CustomUserType)

    def resolve_recipe_ingredients(self, info):
        return self.recipeingredient_set.all()


class IngredientType(DjangoObjectType):
    class Meta:
        model = Ingredient

class CreateIngredientMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    success = graphene.Boolean()
    ingredient = graphene.Field(IngredientType)

    def mutate(self, info, name,):
        data = {'name': name, }
        serializer = IngredientSerializer(data=data)
        if serializer.is_valid():
            ingredient = serializer.save()
            return CreateIngredientMutation(ingredient=ingredient, success=True)
        else:
            print(serializer.errors)
            return CreateIngredientMutation(ingredient=None, success=False)
        
class CreateRecipeMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=True)
        instructions = graphene.String(required=True)
        image = graphene.String()
        ingredients = graphene.List(graphene.String, required=True)  # New field for ingredient names
        amounts = graphene.List(graphene.String, required=False) 
        created_by = graphene.Int()

    success = graphene.Boolean()
    recipe = graphene.Field(RecipeType)

    def mutate(self, info, description, name, instructions, image, ingredients, amounts, created_by, **kwargs):
        # Create or get ingredients and their amounts
        ingredient_objects = []
        for ingredient_name, amount in zip(ingredients, amounts):
            ingredient, created = Ingredient.objects.get_or_create(name=ingredient_name)
            ingredient_objects.append({'ingredient': ingredient.id, 'amount': amount})

        data = {
            'name': name,
            'description': description,
            'instructions': instructions,
            'image': image,
            'created_by': created_by,
            'ingredients': ingredient_objects  # Pass the list of dictionaries
        }

        serializer = RecipeSerializer(data=data)

        if serializer.is_valid():
            recipe = serializer.save()
            return CreateRecipeMutation(recipe=recipe, success=True)
        else:
            print("Serializer errors:", serializer.errors)
            return CreateRecipeMutation(recipe=None, success=False)


class UpdateRecipeMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String()
        description = graphene.String()
        instructions = graphene.String()
        image = graphene.String()  # Assuming base64 encoded image
        ingredient_ids = graphene.List(graphene.Int)

    success = graphene.Boolean()
    recipe = graphene.Field(RecipeType)

    def mutate(self, info, id, **kwargs):
        user = info.context.user

        try:
            recipe = Recipe.objects.get(id=id, created_by=user)
        except Recipe.DoesNotExist:
            return UpdateRecipeMutation(success=False)

        for field, value in kwargs.items():
            if field == 'ingredient_ids':
                ingredients = Ingredient.objects.filter(id__in=value)
                recipe.ingredients.set(ingredients)
            else:
                setattr(recipe, field, value)

        recipe.save()
        return UpdateRecipeMutation(recipe=recipe, success=True)

class GeneratePresignedUrl(graphene.Mutation):
    class Arguments:
        file_name = graphene.String(required=True)
        file_type = graphene.String(required=True)
        
    presigned_url = graphene.String()
    
    def mutate(self, info, file_name, file_type):
        s3_client = boto3.client(
            's3',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID', 'default_value'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY', 'default_value'),
            region_name='us-east-2',
        )
        
        presigned_url = s3_client.generate_presigned_url(
            'put_object',
            Params={'Bucket': 'collabcook',
                    'Key': file_name,
                    'ContentType': file_type},
            ExpiresIn=3600
        )
        
        return GeneratePresignedUrl(presigned_url=presigned_url)
    
class Mutation(graphene.ObjectType):
    create_ingredient = CreateIngredientMutation.Field()
    create_recipe = CreateRecipeMutation.Field()
    update_recipe = UpdateRecipeMutation.Field()
    generate_presigned_url = GeneratePresignedUrl.Field()



class Query(
    graphene.ObjectType
):
    ingredients = graphene.List(IngredientType)
    recipes = graphene.List(RecipeType)
    recipe = graphene.Field(RecipeType, id=graphene.Int(required=True))

    def resolve_ingredients(self, info):
        return Ingredient.objects.all()

    def resolve_recipes(self, info):
        return Recipe.objects.all()
    
    def resolve_recipe(self, info, id):
        try:
            return Recipe.objects.get(id=id)
        except Recipe.DoesNotExist:
            return None



schema = graphene.Schema(query=Query, mutation=Mutation)