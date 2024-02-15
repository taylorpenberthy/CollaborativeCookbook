import React from "react";
import thecookbooklogo from "../media/thecookbooklogo.png";
import mainpage from "./pink.png";
import { createUseStyles } from "react-jss";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// overwrite materialUI's built-in colors for the CTA button
const theme = createTheme({
  palette: {
    primary: {
      main: "#A2D2FF",
    },
  },
});

const useStyles = createUseStyles({
  heroContainer: {
    display: "flex",
    alignItems: "center",

    flexDirection: "column",
    justifyContent: "center",
  },
  gatheringImg: {
    maxWidth: "250px",
    maxHeight: "250px",
  },
  imgContainer: {},
  heroButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cookbookLogo: {
    maxHeight: "100vh",
    marginBottom: '20px',
  },
});

function CoCookHome() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.heroContainer}>
        <img className={classes.cookbookLogo} src={thecookbooklogo} alt="CoCook" />
        
      <ThemeProvider theme={theme}><Button href={'/new'}
      color="primary" variant="contained">Create your first recipe</Button>
      </ThemeProvider>
      </div>
      
    </React.Fragment>
  );
}
export default CoCookHome;
