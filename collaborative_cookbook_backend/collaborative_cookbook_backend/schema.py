import graphene
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload

from django.contrib.auth import get_user_model

from recipes.models import Recipe, Ingredient
from recipes.serializers import RecipeSerializer, IngredientSerializer

class CustomUserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "first_name", "last_name")

class RecipeType(DjangoObjectType):
    class Meta:
        model = Recipe
        fields = ("id", "name", "ingredients", "created_by", "description", "instructions", "image")

    created_by = graphene.Field(lambda: CustomUserType)


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
        print('serializer', serializer)
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
        image = graphene.String()  # Assuming base64 encoded image
        ingredient_ids = graphene.List(graphene.Int, required=True)
        created_by = graphene.Int()

    success = graphene.Boolean()
    recipe = graphene.Field(RecipeType)

    def mutate(self, info, description, name, instructions, image, ingredient_ids, created_by, **kwargs):
        print('DEBUGGGING CREATED BY: ', created_by)
        ingredients = Ingredient.objects.filter(id__in=ingredient_ids)
        data = {
            'name': name,
            'description': description,
            'instructions': instructions,
            'image': image,
            'created_by': created_by,
            'ingredients': ingredient_ids
        }

        serializer = RecipeSerializer(data=data)
        if serializer.is_valid():
            recipe = serializer.save()
            recipe.ingredients.set(ingredients)
            recipe.save()
            return CreateRecipeMutation(recipe=recipe, success=True)
        else:
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
# Similar mutations for updating Recipe and Ingredient

class Mutation(graphene.ObjectType):
    create_ingredient = CreateIngredientMutation.Field()
    create_recipe = CreateRecipeMutation.Field()
    update_recipe = UpdateRecipeMutation.Field()


class Query(
    graphene.ObjectType
):
    ingredients = graphene.List(IngredientType)
    recipes = graphene.List(RecipeType)

    def resolve_ingredients(self, info):
        return Ingredient.objects.all()

    def resolve_recipes(self, info):
        return Recipe.objects.all()



schema = graphene.Schema(query=Query, mutation=Mutation)