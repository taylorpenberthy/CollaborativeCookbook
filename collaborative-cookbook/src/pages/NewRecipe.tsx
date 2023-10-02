import React, { useState, FormEvent } from "react";
import { Button, TextField, Typography, Grid, InputAdornment } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { CREATE_RECIPE, GENERATE_PRESIGNED_URL } from "../queries";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  formStyle: {
    margin: 20,
    padding: '20px',
    backgroundColor: '#f9f5e8', 
    border: '2px solid #d1c7ac', 
    borderRadius: '10px',
    boxShadow: '5px 5px 10px #888888',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontFamily: "'Courier New', Courier, monospace", 
    borderBottom: '2px solid #d1c7ac',
    paddingBottom: '10px',
  },
  textField: {
    fontFamily: "'Courier New', Courier, monospace",
  },
  ingredientSection: {
    marginTop: '20px',
    borderBottom: '1px dashed #d1c7ac',
    paddingBottom: '10px',
  },
  button: {
    backgroundColor: '#d1c7ac', 
    '&:hover': {
      backgroundColor: '#b5a490',
    },
  },
});

const NewRecipe: React.FC = () => {
  const classes = useStyles();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
    const [image, setImage] = useState<File | null>(null);
    const [generatePresignedUrl] = useMutation(GENERATE_PRESIGNED_URL);
  
    const [createRecipe, { data, loading, error }] = useMutation(CREATE_RECIPE, {
        variables: {
            name: title,
            description: description,
            instructions: instructions,
            ingredients: ingredients.length ? ingredients.map(ing => ing.name) : [],
            amounts: ingredients.length ? ingredients.map(ing => ing.amount) : [],
            image: image,
            createdBy: 1,
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
 
    const uploadToS3 = async (file: File) => {
      const fileName = `recipes/${file.name}`;
      const fileType = file.type;
      
      // Fetch the pre-signed URL using GraphQL mutation
      const { data } = await generatePresignedUrl({
          variables: {
              fileName: fileName,
              fileType: fileType
          }
      });
      
      const presigned_url = data.generatePresignedUrl.presignedUrl;
      
      // Upload the file to S3
      await fetch(presigned_url, {
          method: 'PUT',
          headers: {
              'Content-Type': fileType,
          },
          body: file,
      });
      
      // Construct the full S3 URL
      const fullS3Url = `https://collabcook.s3.amazonaws.com/${fileName}`;
      
      return fullS3Url;  // This will be saved in your database
  };
  
   
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
      }
    };
  
    const addIngredientField = () => {
      setIngredients([...ingredients, { name: '', amount: '' }]);
    };
  
    // TODO: Implement the submit logic here
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
      
        // Separate ingredients and amounts into two arrays
        const ingredientNames = ingredients.map((ing) => ing.name);
        const ingredientAmounts = ingredients.map((ing) => ing.amount);

        let s3FileName = null;
        if (image) {
            s3FileName = await uploadToS3(image);
        }
        try {
          await createRecipe({
            variables: {
              name: title,
              description: description,
              instructions: instructions,
              ingredients: ingredientNames,
              amounts: ingredientAmounts,
              image: s3FileName,
              createdBy: 1,
            },
          });
          navigate(`/recipes/${data.createRecipe.recipe.id}`);
        } catch (err) {
          console.error('Error creating recipe:', err);
        }
      };
  
      return (
        <form onSubmit={handleSubmit} className={classes.formStyle}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.title}>New Recipe</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} className={classes.ingredientSection}>
              <Typography variant="h6">Ingredients</Typography>
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
                  }
                  }
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
                    endAdornment: <InputAdornment position="end">g</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
              ))}
              <Button onClick={addIngredientField} className={classes.button}>Add Ingredient</Button>
            </Grid>
            <Grid item xs={12} className={classes.imageContainer}>
              <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" color="secondary" component="span">
                  Upload Image
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    };
  

export default NewRecipe;
