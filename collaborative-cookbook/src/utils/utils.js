import { createUseStyles } from "react-jss";

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
    uppercase: true,
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
    // dark blue background color, surrounding the collabcook header
    padding: "4px",
    borderRadius: "25px",
    backgroundColor: "#CB997E",
    zIndex: 1,
    maxWidth: "25%",
    maxHeight: "25%",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#d1c7ac",
    "&:hover": {
      backgroundColor: "#b5a490",
    },
  },
});
