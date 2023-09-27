import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../queries';
import {Card, CardContent, CardHeader, Typography, Grid} from '@mui/material';



const useStyles = createUseStyles({
    card: {
        backgroundColor: 'lightgray'
    }
});
const  AllRecipes = () => {
    const { loading, error, data } = useQuery(GET_RECIPES);
    const classes = useStyles();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log('data', data)

    return (
        <Grid container spacing={3}>
          {data && data.recipes && data.recipes.map((recipe: any) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card className={classes.card}>
                <CardHeader
                  title={recipe.name}
                  subheader={`Created by: ${recipe.createdBy.username}`}
                />
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