import { Divider, Typography } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import Review from "../Review/Review";
import { stripePromise } from "../../../lib/stripe";
import CardForm from "./CardForm/CardForm";

const PaymentForm = ({ backStep, checkout }) => {
  return (
    <>
      <Review checkout={checkout} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <CardForm
          backStep={backStep}
          total={checkout.live.subtotal.formatted_with_symbol}
        />
      </Elements>
    </>
  );
};

export default PaymentForm;
