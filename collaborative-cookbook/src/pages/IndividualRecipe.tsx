import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../queries';
import { Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';


interface Ingredient {
    name: string;
}
interface Recipe {
    name: string;
    image: string;
    description: string;
    ingredients: Ingredient[];
    amounts: number[];
    instructions: string[];
    createdBy: {
        username: string;
    };
}

interface RecipeData {
    recipe: Recipe;
}

const IndividualRecipe = () => {
    const { id } = useParams();
    const integerId = parseInt(id || '', 10); 
    const { loading, error, data } = useQuery<RecipeData>(GET_RECIPE, {
        variables: { id: integerId},
    });
    console.log(data);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :</p>;

    const { recipe } = data!;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">{recipe.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardMedia
                        component="img"
                        image={recipe.image}
                        title={recipe.name}
                    />
                    <CardContent>
                        <Typography variant="body1">{recipe.description}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Ingredients</Typography>
                <ul>
                    {recipe.ingredients.map((ingredient: Ingredient, index: number) => (
                        <li key={index}>
                            {ingredient.name} 
                        </li>
                    ))}
                </ul>
                <Typography variant="h6">Instructions</Typography>
                <Typography variant="body2">{recipe.instructions}</Typography>
                <Typography variant="body2">Created by: {recipe.createdBy.username}</Typography>
            </Grid>
        </Grid>
    );
};

export default IndividualRecipe;