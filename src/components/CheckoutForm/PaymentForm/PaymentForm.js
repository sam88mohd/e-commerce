import { Button, Divider } from "@material-ui/core";
import React from "react";
import useStyles from "../Checkout/styles";
import Review from "../Review/Review";

const PaymentForm = ({ backStep, checkout }) => {
  const classes = useStyles();
  return (
    <>
      <Review checkout={checkout} />

      <Divider />

      <div className={classes.buttons}>
        <Button
          variant="outlined"
          onClick={backStep}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={backStep}
        >
          Pay {checkout.live.subtotal.formatted_with_symbol}
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;
