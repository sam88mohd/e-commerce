import { Button } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import useStyles from "../../Checkout/styles";

const CardForm = ({
  total,
  backStep,
  checkout,
  shippingData,
  captureOrder,
  nextStep,
}) => {
  const classes = useStyles();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("error:", error.message);
    } else {
      const orderData = {
        line_items: checkout.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      captureOrder(checkout.id, orderData);

      nextStep();
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
