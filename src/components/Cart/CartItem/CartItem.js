import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { noImageLink } from "../../Products/Product/Product.js";
import useStyles from "./styles.js";

const CartItem = ({ item, handleRemoveItemInCart, handleUpdateItemInCart }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        image={item.image ? item.image.url : noImageLink}
        title={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6">{item.price.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.button}>
          <Button
            disabled={item.quantity === 1}
            type="button"
            size="small"
            onClick={() => handleUpdateItemInCart(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateItemInCart(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          type="button"
          color="secondary"
          variant="contained"
          onClick={() => handleRemoveItemInCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
