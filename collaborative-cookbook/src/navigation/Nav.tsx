
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
  } from '@mui/material';
import { createUseStyles } from 'react-jss';
import About from '../pages/About';
import AllRecipes from '../pages/AllRecipes';
import Creators from '../pages/Creators';
import CoCookHome from '../pages/CoCookHome';
import NewRecipe from '../pages/NewRecipe';
import IndividualRecipe from '../pages/IndividualRecipe';

const RECIPES = 'recipes';
const CREATORS = 'creators';
const NEW_RECIPE = 'new recipe'
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const useStyles = createUseStyles({
    logoContainer: {
      margin: '10px',
    },
    logoAndTitleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    navBarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center', // This will vertically align the items
    },
    leftMenu: {
      justifyContent: 'flex-start',
    },
    rightMenu: {
      justifyContent: 'flex-end',
    },
  });
function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const classes = useStyles();

  return (
    <Router>
    <AppBar position="static" style={{ background: 'none', boxShadow: 'none'}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters className={classes.navBarContainer}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex', flexDirection: 'column' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#A5A58D',
              textDecoration: 'none',
            }}
          >
            CoCook
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box  sx={{ display: { xs: 'flex', md: 'flex' }, justifyContent: 'flex-start' }}>
            
              <Button
                key={RECIPES}
                component={Link} to="/about"
                sx={{ my: 2, color: '#A5A58D', fontWeight: 600, display: 'block' }}
              >
                ABOUT
              </Button>
              <Button
                key={RECIPES}
                component={Link} to="/recipes"
                sx={{ my: 2, color: '#A5A58D', fontWeight: 600, display: 'block' }}
              >
                All Recipes
              </Button>
              <Button
                key={RECIPES}
                component={Link} to="/creators"
                sx={{ my: 2, color: '#A5A58D', fontWeight: 600, display: 'block' }}
              >
                {CREATORS}
              </Button>
              <Button
                key={RECIPES}
                component={Link} to="/new"
                sx={{ my: 2, color: '#A5A58D', fontWeight: 600, display: 'block' }}
              >
                {NEW_RECIPE}
              </Button>
              
            
          </Box>   
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Temy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Routes>
    <Route path="/about" element={<About/>} />
      <Route path="/recipes" element={<AllRecipes/>} />
      <Route path="/creators" element={<Creators/>} />
      <Route path="/new" element={<NewRecipe/>}/>
      <Route path="/" element={<CoCookHome />}/>
      <Route path="/recipes/:id" element={<IndividualRecipe />} />
      </Routes>
    </Router>
  );
}
export default ResponsiveAppBar;