import React from "react";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import useFetchCart from "./hooks/useFetchCart";
import useFetchProducts from "./hooks/useFetchProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({});

const App = () => {
  const { items: products } = useFetchProducts();
  const { cart, handleAddToCart } = useFetchCart();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar totalItems={cart.total_items} />
          <Routes>
            <Route
              exect
              path="/"
              element={
                <Products
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route path="/cart" element={<Cart cart={cart} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
