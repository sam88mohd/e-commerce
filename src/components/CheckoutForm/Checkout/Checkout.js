import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { commerce } from "../../../lib/commerce";
import Loading from "../../Loading/Loading";
import AddressForm from "../AdressForm/AddressForm";
import Confirmation from "../Confirmation/Confirmation";
import PaymentForm from "../PaymentForm/PaymentForm";
import useStyles from "./styles";

const Checkout = ({ cartId, captureOrder, order }) => {
  const [checkout, setCheckout] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const classes = useStyles();

  const createCheckoutToken = async (cartId) => {
    try {
      const checkout = await commerce.checkout.generateToken(cartId, {
        type: "cart",
      });
      setCheckout(checkout);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    createCheckoutToken(cartId);
  }, [cartId]);

  const steps = ["shipping address", "shipping payment"];

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const backStep = () => setActiveStep((prevStep) => prevStep - 1);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkout={checkout} test={test} isLoading={isLoading} />
    ) : (
      <PaymentForm
        backStep={backStep}
        checkout={checkout}
        shippingData={shippingData}
        captureOrder={captureOrder}
        nextStep={nextStep}
      />
    );

  return !isLoading ? (
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
  ) : (
    <Loading />
  );
};

export default Checkout;
