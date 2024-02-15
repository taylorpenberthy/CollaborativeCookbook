import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Typography, Divider, Grid, Card, CardMedia, CardContent, CardHeader, Button } from '@mui/material';
import { GET_RECIPES } from '../queries';
import { useBookStyles, recipeTypeToImage } from "../utils/utils";
import type { Recipe } from '../utils/types';
import thecookbooklogo from '../media/thecookbooklogo.png';

interface RecipeCardProps {
  recipe: Recipe;
  classes: any;
  onClick: () => void;
}

interface RecipeImageProps {
  recipeType: string;
  classes: {
    chefHatIcon: string;
  };
}
const RecipeImage: React.FC<RecipeImageProps> = ({ recipeType, classes }) => {
  const { src, alt } = recipeTypeToImage[recipeType] || {};
  return src ? <img className={classes.chefHatIcon} src={src} alt={alt} /> : null;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, classes, onClick }) =>  (
  <Card className={classes.card} onClick={onClick}>
    {recipe.image && (
      <CardMedia
        className={classes.media}
        image={recipe.image}
        title={recipe.name}
      />
    )}
    <CardContent>
    <Typography variant="h3" className={classes.recipeHeader}>
        {recipe.name.toUpperCase()}
    </Typography>
    <Typography variant="h5" className={classes.recipeCreator}>
        Chef: {recipe.createdBy.username}
    </Typography>
    <div>
    <RecipeImage recipeType={recipe.recipeType} classes={{ chefHatIcon: classes.chefHatIcon }} />
    </div>
    </CardContent>
  </Card>
);


const AllRecipes = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_RECIPES);
  const classes = useBookStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleNavigate = (recipeId: string) => () => navigate(`/recipes/${recipeId}`);

  return (
    <div className={classes.bookContainer}>
      <div className={`${classes.page} ${classes.leftPage}`}>
        <img src={thecookbooklogo} alt="CookbookLogo" className={classes.cookbookLogo}/>
      </div>
      <div className={classes.spine}></div>
      <div className={`${classes.page} ${classes.rightPage}`}>
        <Typography variant="h3" className={classes.collabCookHeader}>
          Table of Contents
        </Typography>
        <Divider />
        <Grid container className={classes.cardsContainer}>
          {data?.recipes.map((recipe: Recipe) => (
            <Grid item key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                classes={classes}
                onClick={handleNavigate(recipe.id)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default AllRecipes;
