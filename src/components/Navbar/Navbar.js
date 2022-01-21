import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import logo from "../../assets/logo.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <img
              src={logo}
              alt="logo"
              className={classes.image}
              height="25px"
            />
            Commerce.js
          </Typography>
          <div className={classes.grow}></div>
          <IconButton aria-label="show cart items" color="inherit">
            <Badge badgeContent={2} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
