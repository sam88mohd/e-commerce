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

const CartItem = ({ item }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.media.source ? item.media.source : noImageLink}
        title={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6">{item.price.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.button}>
          <Button type="button" size="small">
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size="small">
            +
          </Button>
        </div>
        <Button type="button" color="secondary" variant="contained">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
