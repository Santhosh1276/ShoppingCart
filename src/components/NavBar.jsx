/* eslint-disable no-unused-vars */
// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Button, Typography,Switch  } from '@mui/material';
import { Link } from 'react-router-dom';

// NavBar Component
const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Shopping Cart
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>
        

      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
