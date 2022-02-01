import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";

const Confirmation = ({ order }) => {
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
    <Loading />
  );
};

export default Confirmation;
