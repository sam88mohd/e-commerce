import { Button, Container, Grid, Link, Typography } from "@material-ui/core";
import React from "react";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import { Link as LinkDom } from "react-router-dom";
import useFetchCart from "../../hooks/useFetchCart";

const Cart = ({ cart }) => {
  const classes = useStyles();
  const { handleEmptyCart } = useFetchCart();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no item in your shopping cart,
        <Link component={LinkDom} to="/" className={classes.link}>
          start adding some!
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <CartItem item={item} />
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
                onClick={handleEmptyCart}
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
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
