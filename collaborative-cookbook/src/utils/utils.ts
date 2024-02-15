import { createUseStyles } from "react-jss";
import chocCake from '../media/chocCake.png';
import pancakes from '../media/pancakes.png';
import salad from '../media/salad.png';
import dinner from '../media/dinner.png';
import apps from '../media/apps.png';
import drinks from '../media/drinks.png';

export const useCommonStyles = createUseStyles({
  timeAndServings: {
    display: "flex",
    marginBottom: "10px",
  },
  basicInfo: {
    height: "70px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "self-end",
  },
  description: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "OldStandardTT",
  },
  submitButton: {
    marginTop: "20px",
  },
  recipeName: {
    fontFamily: "Comfortaa", // Elegant font for recipe name
    color: "#4a4a4a", // Dark gray
    textAlign: "center",
  },
  subHeader: {
    fontFamily: "OldStandardTTBold", // Modern sans-serif font
    fontSize: "18px",
    color: "#333", // Dark gray
  },
  bodyText: {
    fontFamily: "OldStandardTTItalic",
    color: "#333", // Dark gray
    fontSize: "14px",
    lineHeight: "1.5",
  },
  createdBy: {
    fontFamily: "Britney-Variable",
    color: "#777", // Light gray
    fontSize: "12px",
  },
  instructionsList: {
    fontFamily: "OldStandardTT",
    fontSize: "13px",
    color: "#333",
    listStyleType: "none",
    paddingLeft: "0px",
  },
  ingredientsList: {
    fontFamily: "OldStandardTT",
    fontSize: "13px",
    color: "#333",
    lineHeight: "1.5",
    listStyleType: "none", // Number of columns
    columnGap: "6px",
    paddingLeft: "0px",
    columnCount: "2",
  },
  ingredientsCard: {
    fontFamily: "ReenieBeanie",
    fontSize: "14px",
    lineHeight: "1.5",
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
    padding: "40px",
    position: "relative",
  },
  rightPage: {
    borderRadius: "25px 0 0 25px", // Left page curl
    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.2), inset 0px 0px 50px rgba(0,0,0,0.1)",
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
    overflow: "auto",
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
  leftPage: {
    borderRadius: "25px 0 0 25px", // Left page curl
    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.2), inset 0px 0px 50px rgba(0,0,0,0.1)",
  },
  vertDivider: {
    padding: "10px",
    marginRight: "10px",
  },
  collabCookHeader: {
    fontFamily: "PatrickHand",
    color: "#4a4a4a",
    fontSize: "12px",
    textAlign: "center",
  },
  header: {
    zIndex: 1,
    maxWidth: "25%",
    maxHeight: "50px",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#d1c7ac",
    "&:hover": {
      backgroundColor: "#b5a490",
    },
  },
  logoContainer: {
    maxHeight: "6vh",
  },
  recipeNameAllRecipes: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', 
    fontSize: '16px', 
    color: '#333', 
    textAlign: 'left', 
    cursor: 'pointer',
    margin: '5px 0', 
    fontWeight: 'normal', 
  },
});

export const useBookStyles = createUseStyles({
  bookContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    background: "#f4f4f4",
    padding: "40px",
    position: "relative",
  },
  rightPage: {
    borderRadius: "25px 0 0 25px", // Left page curl
    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.2), inset 0px 0px 50px rgba(0,0,0,0.1)",
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
    overflow: "auto",
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
  leftPage: {
    borderRadius: "25px 0 0 25px", // Left page curl
    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.2), inset 0px 0px 50px rgba(0,0,0,0.1)",
  },
  collabCookHeader: {
    fontFamily: "PatrickHand",
    color: "#4a4a4a",
    fontSize: "12px",
    textAlign: "center",
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', // Keep cards small
    gap: '15px',
    padding: '20px',
  },
  card: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    height: '250px', // Fixed height for uniform card size
  },
  media: {
    height: '120px', 
    objectFit: 'cover',
    width: '100%', 
  },
  recipeHeader: {
    fontFamily: "PatrickHand",
    color: "#4a4a4a",
    fontSize: "15px",
    textAlign: 'left',
  },
  recipeCreator: {
    fontFamily: "PatrickHand",
    fontSize: "10px",
    fontStyle: "italic",
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #E5E7EB', // Adds a subtle divider
    padding: '8px 10px',
    fontFamily: "PatrickHand",
    fontSize: "10px",
    color: "#4a4a4a",
  },
  cookbookLogo: {
    maxHeight: '20vh'
  },
  chefHatIcon: {
    height: '20px',
    float: 'left'
  }
});
interface RecipeImageMapping {
  [key: string]: { src: string; alt: string };
}

export const recipeTypeToImage: RecipeImageMapping = {
  'DESSERT': { src: chocCake, alt: "Dessert" },
  'DINNER': { src: dinner, alt: "Dinner" },
  'BREAKFAST': { src: pancakes, alt: "Breakfast" },
  'LUNCH': { src: salad, alt: "Lunch" },
  'SIDE': { src: salad, alt: "Side" },
  'DRINK': { src: drinks, alt: "Drink" },
  'APPETIZER': { src: apps, alt: "Appetizer" },
};
