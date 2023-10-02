import React from 'react';
import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../queries';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardMedia, Grid, Button } from '@mui/material';
import type { Recipe } from './types';

const useStyles = createUseStyles({
    cardsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: '80px auto',
      borderRadius: '10px',
      padding: '20px',
      width: '100%',
      color: '#495867',
      gap: '20px',
      flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#FFE8D6',
    border: '2px solid #d1c7ac',
    borderRadius: '10px',
    boxShadow: '5px 5px 10px #888888',
    maxWidth: '100%',
    color: '#495867',
  },
  title: {
    color: '#495867',
  },
  viewRecipeButton: {
    border: "1px solid #495867!important",
    color: "#495867!important",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  heroCard: {
    //modern color scheme
    backgroundColor: '#A5A58D',
    border: '2px solid #d1c7ac',
    borderRadius: '10px',
    boxShadow: '5px 5px 10px #888888',
  },
  heroMedia: {
    // position the text and view recipe button to the left of the image
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  
  heroContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(15%, 80%)',
    backgroundColor: 'rgba(193, 140, 93, 0.8)',
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '5px 5px 10px #888888',
    textAlign: 'center',
  }
});

const AllRecipes = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_RECIPES);
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Grid container className={classes.cardsContainer}>
      {data && data.recipes && data.recipes.map((recipe: Recipe, index: number) => (
        <React.Fragment key={recipe.id}>
          {index === 0 ? (
            <Grid item xs={12} md={10} key={recipe.id}>
              <Card className={classes.heroCard} onClick={() => navigate(`/recipes/${recipe.id}`)}>
                {recipe.image &&
                  <CardMedia
                    className={classes.heroMedia}
                    image={recipe.image}
                    title={recipe.name}
                  />
                }
                <CardContent className={classes.heroContent}>
                  <CardHeader
                    title={recipe.name}
                    className={classes.title}
                    subheader={`Created by: ${recipe.createdBy.username}`}
                  />
                  <Button variant="outlined" className={classes.viewRecipeButton} onClick={() =>navigate(`/recipes/${recipe.id}`)}>
                    View Recipe 
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card className={classes.card} onClick={() => navigate(`/recipes/${recipe.id}`)}>
                <CardHeader
                  title={recipe.name}
                  className={classes.title}
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
                  <Button variant="outlined" className={classes.viewRecipeButton} onClick={() =>navigate(`/recipes/${recipe.id}`)}>
                    View Recipe 
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default AllRecipes;
