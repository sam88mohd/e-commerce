import { Button } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import useStyles from "../../Checkout/styles";

const CardForm = ({ total, backStep }) => {
  const classes = useStyles();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
    });

    if (result.error) {
      console.log("error:", result.error.message);
    } else {
      console.log(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
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
          type="submit"
          variant="contained"
          color="primary"
        >
          Pay {total}
        </Button>
      </div>
    </form>
  );
};

export default CardForm;
