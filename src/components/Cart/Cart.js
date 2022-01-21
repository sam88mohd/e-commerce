import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const Cart = ({ cart }) => {
  const classes = useStyles();
  console.log(cart);

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no item in your shopping cart, start adding some!
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <div>{item.name}</div>
            </Grid>
          ))}
          <div className={classes.cardDetails}>
            <Typography variant="h4">
              Subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
              <Button
                className={classes.emptyButton}
                size="large"
                type="button"
                variant="contained"
                color="secondary"
              >
                Empty Cart
              </Button>
              <Button
                className={classes.checkoutButton}
                size="large"
                type="button"
                variant="contained"
                color="primary"
              >
                Checkout
              </Button>
            </div>
          </div>
        </Grid>
      </>
    );
  };

  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <Typography variant="h3" className={classes.title}>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
