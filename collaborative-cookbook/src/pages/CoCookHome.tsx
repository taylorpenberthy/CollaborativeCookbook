import React from 'react';
import cocook from './cocook.png';
import mainpage from './pink.png';
import { createUseStyles } from 'react-jss';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// overwrite materialUI's built-in colors for the CTA button
const theme = createTheme({
  palette: {
    primary: {
      main: "#5E9761",
    }
  },
});

const useStyles = createUseStyles({
  heroContainer: {
    display: "flex",
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-around',
    margin: "80px 80px 80px 160px"
  },
  gatheringImg: {
    maxWidth: "250px",
    maxHeight: "250px",
  },
  imgContainer: {

  },
  heroButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  coCook: {
    maxWidth: '800px',
    maxHeight: '500px'
  }
})

function CoCookHome() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <div className={classes.heroContainer} >
      <div className={classes.imgContainer}>
      <img className={classes.gatheringImg} src={mainpage} alt="gathering"/>
      </div>
      <div >
      <img className={classes.coCook} src={cocook} alt="CoCook"/>
    </div>

  </div>
  <div className={classes.heroButton}>
      <ThemeProvider theme={theme}>
      <Button href={'/new'}
      color="primary" variant="contained">Create your first recipe</Button>
      </ThemeProvider>
      </div>
      </React.Fragment>
  );
}
export default CoCookHome;