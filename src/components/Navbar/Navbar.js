import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import logo from "../../assets/logo.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="logo" className={classes.image} />
          <Typography variant="h4" color="inherit">
            Commerce
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
