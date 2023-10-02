import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../queries';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardMedia, Typography, Grid } from '@mui/material';
import type { Recipe } from './types';

const useStyles = createUseStyles({
  card: {
    backgroundColor: 'lightgray',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
});

const AllRecipes = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_RECIPES);
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Grid container spacing={3}>
      {data && data.recipes && data.recipes.map((recipe: Recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <Card className={classes.card} onClick={() => navigate(`/recipes/${recipe.id}`)}>
            <CardHeader
              title={recipe.name}
              subheader={`Created by: ${recipe.createdBy.username}`}
            />
            {recipe.image &&
             <CardMedia
              className={classes.media}
              image={recipe.image}
              title={recipe.name}
            />
            }
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Ingredients:
              </Typography>
              <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient: any) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllRecipes;
