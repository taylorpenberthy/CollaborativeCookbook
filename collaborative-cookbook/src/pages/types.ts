
export interface IngredientType {
    id: number;
    name: string;
}

export interface Recipe {
    id: number;
    name: string;
    createdBy: {
        username: string;
    }
    image: string;
    description: string;
    instructions: string;
    ingredients: IngredientType[]
}