import { Button, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Confirmation = ({ order }) => {
  const classes = useStyles();
  return order.customer ? (
    <>
      <Typography variant="h5" gutterBottom>
        Thank your for your purchase.
      </Typography>
      <Button variant="outlined" color="primary" component={Link} to="/">
        Back to Home
      </Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};

export default Confirmation;
