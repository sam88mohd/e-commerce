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

  const classes = useStyles();

  const steps = ["shipping address", "shipping payment"];
  console.log(countries);

  const Form = () =>
    activeStep === 0 ? <AddressForm countries={countries} /> : <PaymentForm />;

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
