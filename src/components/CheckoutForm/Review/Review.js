import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import React from "react";

const Review = ({ checkout }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List>
        {checkout.live.line_items.map((item) => (
          <ListItem style={{ padding: "10px 0" }} key={item.name}>
            <ListItemText
              primary={item.product_name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body2">
              {item.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total:" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkout.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;
