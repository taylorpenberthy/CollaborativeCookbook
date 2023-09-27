import gql from 'graphql-tag';

export const GET_RECIPES = gql`
  query {
    recipes {
      id
      name
      createdBy {
        username
      }
      ingredients {
        name
      }
    }
  }
`;