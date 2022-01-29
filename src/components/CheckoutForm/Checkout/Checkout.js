import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useCheckout from "../../../hooks/useCheckout";
import AddressForm from "../AdressForm/AddressForm";
import Confirmation from "../Confirmation/Confirmation";
import PaymentForm from "../PaymentForm/PaymentForm";
import useStyles from "./styles";

const Checkout = ({ cartId }) => {
  const { checkout, countries } = useCheckout(cartId);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const classes = useStyles();

  const steps = ["shipping address", "shipping payment"];

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  console.log(shippingData);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm countries={countries} checkout={checkout} test={test} />
    ) : (
      <PaymentForm />
    );

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
        {activeStep === steps.length ? <Confirmation /> : <Form />}
      </Paper>
    </main>
  );
};

export default Checkout;
