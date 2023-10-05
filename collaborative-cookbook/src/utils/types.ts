


export interface IngredientType {
    name: string;
  }
  
export interface RecipeIngredient {
    amount: string;
    ingredient: {
      name: string;
    };
  }

export interface Recipe {
    id: string;
    name: string;
    image: string;
    description: string;
    ingredients: IngredientType[];
    amounts: number[];
    instructions: string;
    createdBy: {
      username: string;
    };
    recipeIngredients: RecipeIngredient[];
  }