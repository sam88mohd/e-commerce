import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useStyles from "./styles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
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
              onClick={() => navigate("/")}
            />
            Commerce.js
          </Typography>
          <div className={classes.grow}></div>
          {location.pathname === "/" && (
            <IconButton
              aria-label="show cart items"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
