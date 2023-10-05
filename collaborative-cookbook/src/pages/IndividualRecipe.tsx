import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "../queries";
import {
  Divider,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useCommonStyles } from "../utils/utils";
import type { Recipe, RecipeIngredient } from "../utils/types";

interface RecipeData {
  recipe: Recipe;
}

const IndividualRecipe = () => {
  const classes = useCommonStyles();
  const { id } = useParams();
  const integerId = parseInt(id || "", 10);
  const { loading, error, data } = useQuery<RecipeData>(GET_RECIPE, {
    variables: { id: integerId },
  });
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: </p>;

  const { recipe } = data!;

  const instructionsArray = recipe.instructions.split("\n");
  return (
    <div className={classes.bookContainer}>
      <div className={`${classes.page} ${classes.leftPage}`}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.collabCookHeader}>
            The Collaborative Cookbook
          </Typography>
        </div>
        <Divider />
        <Typography variant="h4" className={classes.recipeName}>
          {recipe.name.toUpperCase()}
        </Typography>

        <div className={classes.description}>
          <Typography variant="body1" className={classes.bodyText}>
            {recipe.description}
          </Typography>
        </div>
        <div className={classes.basicInfo}>
          <div className={classes.timeAndServings}>
            <Typography variant="body1" className={classes.bodyText}>
              Serves: 12
            </Typography>
            <Divider orientation="vertical" className={classes.vertDivider} />
            <Typography variant="body1" className={classes.bodyText}>
              Prep: 10 minutes
            </Typography>
            <Divider orientation="vertical" className={classes.vertDivider} />
            <Typography variant="body1" className={classes.bodyText}>
              Cook: 15 minutes
            </Typography>
            <Divider orientation="vertical" className={classes.vertDivider} />
            <Typography variant="body1" className={classes.bodyText}>
              Total: 25 minutes
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.ingredientsCard}>
          <Typography variant="h6" className={classes.subHeader}>
            INGREDIENTS
          </Typography>
          <ul className={classes.ingredientsList}>
            {recipe.recipeIngredients.map(
              (recipeIngredient: RecipeIngredient) => (
                <li
                  key={recipeIngredient.amount}
                  style={{ marginBottom: "8px" }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {recipeIngredient.amount}
                  </span>{" "}
                  {recipeIngredient.ingredient.name}
                </li>
              )
            )}
          </ul>
        </div>
        <Divider />
        <Typography variant="h6" className={classes.subHeader}>
          INSTRUCTIONS
        </Typography>
        <ol className={`${classes.instructionsList} ${classes.bodyText}`}>
          {instructionsArray.map((instruction, index) => (
            <li key={index}>
              Step {index + 1}: {instruction}
            </li>
          ))}
        </ol>
        <Typography variant="body2" className={classes.createdBy}>
          Created by: {recipe.createdBy.username}
        </Typography>
      </div>
      <div className={classes.spine}></div>

      <div className={`${classes.page}`}>
        <Card className={classes.imageCard}>
          <CardMedia component="img" image={recipe.image} title={recipe.name} />
          <CardContent>
            <Typography variant="body1">{recipe.description}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndividualRecipe;
