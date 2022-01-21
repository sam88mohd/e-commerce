import { Grid } from "@material-ui/core";
import React from "react";
import useFetch from "../../hooks/useFetch";
import Product from "./Product/Product";
import useStyles from "./styles";

const Products = () => {
  const { items: products } = useFetch();
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
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default Products;
