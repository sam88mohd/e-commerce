import { Grid } from "@material-ui/core";
import React from "react";
import Product from "./Product/Product";
import useStyles from "./styles";

const Products = ({ products, handleAddToCart }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        data-testid="grid-container"
      >
        {products &&
          products.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              data-testid={`item-${index}`}
            >
              <Product product={product} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default Products;
