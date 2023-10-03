import gql from 'graphql-tag';

export const GET_RECIPES = gql`
  query {
    recipes {
      id
      name
      createdBy {
        username
      }
      image
      description
      instructions
      ingredients {
        name
      }
    }
  }
`;

export const GET_RECIPE = gql`
  query getRecipe($id: Int!) {
    recipe(id: $id) {
      id
      name
      createdBy {
        username
      }
      image
      recipeIngredients {
        amount
        ingredient {
          name
        }
      }
      description
      instructions
      ingredients {
        name
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation createRecipeMutation(
    $name: String!
    $ingredients: [String!]!
    $amounts: [String]
    $instructions: String!
    $description: String!
    $createdBy: Int!
    $image: String
  ) {
    createRecipe(
      name: $name
      ingredients: $ingredients
      amounts: $amounts
      instructions: $instructions
      description: $description
      createdBy: $createdBy
      image: $image
    ) {
      success
      recipe {
        id
        name
      }
    }
  }
`;

export const GENERATE_PRESIGNED_URL = gql`
  mutation GeneratePresignedUrl($fileName: String!, $fileType: String!) {
    generatePresignedUrl(fileName: $fileName, fileType: $fileType) {
      presignedUrl
    }
  }
`;