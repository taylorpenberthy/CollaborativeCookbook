import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "../queries";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";

interface Ingredient {
  name: string;
}

interface RecipeIngredient {
  amount: string;
  ingredient: {
    name: string;
  };
}
interface Recipe {
  name: string;
  image: string;
  description: string;
  ingredients: Ingredient[];
  amounts: number[];
  instructions: string;
  createdBy: {
    username: string;
  };
  recipeIngredients: RecipeIngredient[];
}

interface RecipeData {
  recipe: Recipe;
}

const useStyles = createUseStyles({
  body: {
    background: "none!important",
  },
  instructionsList: {
    listStyleType: "none",
    paddingLeft: "0px",
  },
  ingredientsList: {
    fontFamily: "Montserrat",
    fontSize: "14px",
    lineHeight: "1.5",
    listStyleType: "none",
    columnCount: 2, // Number of columns
    columnGap: "16px",
  },
  ingredientsCard: {
    maxWidth: "200px",
    overflow: "auto",
  },
  imageCard: {
    float: "right",
    marginRight: "20px",
  },
  bookContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    background: "#f4f4f4",
    padding: "40px",
    position: "relative",
  },
  page: {
    flex: 1,
    border: "1px solid #ccc",
    padding: "20px",
    boxSizing: "border-box",
    background: "#fff",
    height: "600px",
    width: "400px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "0 25px 25px 0", // Right page curl
    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.2), inset 0px 0px 50px rgba(0,0,0,0.1)",
  },
  spine: {
    width: "15px",
    height: "600px",
    background: "linear-gradient(to bottom, #fff, #ccc, #fff)",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: -1,
  },
  spiral: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#333",
    position: "absolute",
    left: "50%",
  },
  leftPage: {
    borderRadius: "25px 0 0 25px", // Left page curl
    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.2), inset 0px 0px 50px rgba(0,0,0,0.1)",
  },
});

const IndividualRecipe = () => {
  const classes = useStyles();
  const { id } = useParams();
  const integerId = parseInt(id || "", 10);
  const { loading, error, data } = useQuery<RecipeData>(GET_RECIPE, {
    variables: { id: integerId },
  });
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :</p>;

  const { recipe } = data!;

  const instructionsArray = recipe.instructions.split("\n");
  return (
    <div className={classes.bookContainer}>
      <div className={`${classes.page} ${classes.leftPage}`}>
        <Typography variant="h4">{recipe.name}</Typography>
        <div className={classes.ingredientsCard}>
          <Typography
            variant="h6"
            style={{
              textAlign: "left",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: "16px",
              marginLeft: "10px",
            }}
          >
            Ingredients
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
        <Typography variant="h6">Instructions</Typography>
        <ol className={classes.instructionsList}>
          {instructionsArray.map((instruction, index) => (
            <li key={index}>
              Step {index + 1}: {instruction}
            </li>
          ))}
        </ol>
        <Typography variant="body2">
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
