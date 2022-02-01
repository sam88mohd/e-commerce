import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { commerce } from "../../../lib/commerce";
import AddressForm from "../AdressForm/AddressForm";
import Confirmation from "../Confirmation/Confirmation";
import PaymentForm from "../PaymentForm/PaymentForm";
import useStyles from "./styles";

const Checkout = ({ cartId, captureOrder, order }) => {
  const [checkout, setCheckout] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const classes = useStyles();

  const createCheckoutToken = async (cartId) => {
    try {
      const checkout = await commerce.checkout.generateToken(cartId, {
        type: "cart",
      });
      setCheckout(checkout);
    } catch (err) {
      console.error(err);
    }
  };

  const steps = ["shipping address", "shipping payment"];

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const backStep = () => setActiveStep((prevStep) => prevStep - 1);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkout={checkout} test={test} />
    ) : (
      <PaymentForm
        backStep={backStep}
        checkout={checkout}
        shippingData={shippingData}
        captureOrder={captureOrder}
        nextStep={nextStep}
      />
    );

  useEffect(() => {
    createCheckoutToken(cartId);
  }, []);

  return (
    <main className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          className={classes.stepper}
        >
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Confirmation order={order} />
        ) : (
          <Form />
        )}
      </Paper>
    </main>
  );
};

export default Checkout;
