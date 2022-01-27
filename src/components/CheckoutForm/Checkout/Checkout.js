import { Paper, Stepper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const Checkout = () => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper alternativeLabel></Stepper>
      </Paper>
    </main>
  );
};

export default Checkout;
