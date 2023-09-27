import React, { useState, FormEvent } from "react";
import { Button, TextField, Typography, Paper, Grid, InputAdornment } from "@mui/material";
import { AddBox } from "@mui/icons-material";


const NewRecipe: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
    const [image, setImage] = useState<File | null>(null);
  
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
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
        console.log('title', title);
        console.log('description', description);
        console.log('instructions', instructions);
        console.log('ingredients', ingredients);
        console.log('image', image);
    };
  
    console.log('ingredients outside handle sub', ingredients);
    console.log('instructions outside', instructions);
    return (
      <Paper style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Create New Recipe
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Ingredients
          </Typography>
          {ingredients.map((ingredient, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Ingredient"
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
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
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddBox />}
            onClick={addIngredientField}
            style={{ marginTop: '10px' }}
          >
            Add Ingredient
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px', float: 'right' }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    );
  };

export default NewRecipe;
