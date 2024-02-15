import React, { useState, FormEvent } from "react";
import { InputAdornment, Button, Grid, Divider, TextField, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_RECIPE, GENERATE_PRESIGNED_URL } from "../queries";
import { useCommonStyles } from "../utils/utils";


const RecipeBook = () => {
  const classes = useCommonStyles();
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
    const [instructions, setInstructions] = useState<string[]>([""]);
    const [image, setImage] = useState<File | null>(null);
    const [generatePresignedUrl] = useMutation(GENERATE_PRESIGNED_URL);
  

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };
  
  const [createRecipe, { data, loading, error }] = useMutation(CREATE_RECIPE, {
    variables: {
      name: title,
      description: description,
      instructions: instructions,
      ingredients: ingredients.length ? ingredients.map((ing) => ing.name) : [],
      amounts: ingredients.length ? ingredients.map((ing) => ing.amount) : [],
      image: image,
      createdBy: 1,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const uploadToS3 = async (file: File) => {
    const fileName = `recipes/${file.name}`;
    const fileType = file.type;

    const { data } = await generatePresignedUrl({
      variables: {
        fileName: fileName,
        fileType: fileType,
      },
    });

    const presigned_url = data.generatePresignedUrl.presignedUrl;

    await fetch(presigned_url, {
      method: "PUT",
      headers: {
        "Content-Type": fileType,
      },
      body: file,
    });

    const fullS3Url = `https://collabcook.s3.amazonaws.com/${fileName}`;

    return fullS3Url;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    // Separate ingredients and amounts into two arrays
    const ingredientNames =
      ingredients.length && ingredients.map((ing) => ing.name);
    const ingredientAmounts =
      ingredients.length && ingredients.map((ing) => ing.amount);

    const instructionStr = instructions.join("\n");

    let s3FileName = null;
    if (image) {
      s3FileName = await uploadToS3(image);
    }
    try {
      await createRecipe({
        variables: {
          name: title,
          description: description,
          instructions: instructionStr,
          ingredients: ingredientNames,
          amounts: ingredientAmounts,
          image: s3FileName,
          createdBy: 1,
        },
      });
      navigate(`/recipes/${data.createRecipe.recipe.id}`);
    } catch (err) {
      console.error("Error creating recipe:", err);
    }
  };


    return (
       
          <form onSubmit={handleSubmit}>
             <div className={classes.bookContainer}>
            <div className={`${classes.page} ${classes.leftPage}`}>
            <div className={classes.header}>
            <Typography variant="h3" className={classes.collabCookHeader}>The Collaborative Cookbook</Typography>
            </div>
            <Divider />
            <Typography variant="h4" className={classes.recipeName}>
            <TextField
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              fullWidth
            />
          </Typography> 
          <div className={classes.ingredientsCard}>
              <Typography
                variant="h6"
                className={classes.subHeader}
              >
                Ingredients
              </Typography>
              <ul className={classes.ingredientsList}>
              {ingredients.map((ingredient, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={6}>
                <TextField
                  key={index}
                  label={`Ingredient ${index + 1}`}
                  value={ingredient.name}
                  onChange={(event) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = event.target.value;
                    setIngredients(newIngredients);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  value={ingredient.amount}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].amount = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">g</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          ))}
           <Button onClick={addIngredientField} className={classes.button}>
            Add Ingredient
          </Button>
              </ul>
            </div>
            <Divider />
            <Typography variant="h6" className={classes.subHeader}>Instructions</Typography>
            <ol className={`${classes.instructionsList} ${classes.bodyText}`}>
            {instructions.map((instruction, index) => (
            <TextField
              key={index}
              label={`Step ${index + 1}`}
              value={instruction}
              onChange={(event) => {
                const newInstructions = [...instructions];
                newInstructions[index] = event.target.value;
                setInstructions(newInstructions);
              }}
              fullWidth
              multiline
              rows={2}
            />
          ))}
          <Button onClick={() => setInstructions([...instructions, ""])}>
            Add Step
          </Button>
          {instructions.length > 1 && (
            <Button onClick={() => setInstructions(instructions.slice(0, -1))}>
              Remove Last Step
            </Button>
          )}
            </ol>
          </div>
          <div className={classes.spine}></div>
          <div className={`${classes.page}`}>
          <Card className={classes.imageCard}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="secondary" component="span">
              Upload Image
            </Button>
          </label>
                <CardMedia component="img" image={image?.name} title={title} />
                <CardContent>
                    <Typography variant="body1">{description}</Typography>
                </CardContent>
          </Card>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        </div>
      </form>
    );
}



export default RecipeBook;