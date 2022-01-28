import React from "react";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import useCart from "./hooks/useCart";
import useProducts from "./hooks/useProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";

const theme = createTheme({});

const App = () => {
  const { items: products } = useProducts();
  const {
    cart,
    handleAddToCart,
    handleRemoveItemInCart,
    handleEmptyCart,
    handleUpdateItemInCart,
  } = useCart();

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
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  handleEmptyCart={handleEmptyCart}
                  handleRemoveItemInCart={handleRemoveItemInCart}
                  handleUpdateItemInCart={handleUpdateItemInCart}
                />
              }
            />
            <Route path="/checkout" element={<Checkout cartId={cart.id} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
