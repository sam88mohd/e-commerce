import React, { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import { commerce } from "./lib/commerce";

const theme = createTheme({});

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();
      setCart(cart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItemInCart = async (productId) => {
    try {
      const { cart } = await commerce.cart.remove(productId);
      setCart(cart);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateItemInCart = async (productId, quantity) => {
    if (quantity > 0) {
      try {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const refreshCart = async () => {
    try {
      const cart = await commerce.cart.refresh();
      setCart(cart);
    } catch (err) {
      console.error(err);
    }
  };

  const captureOrder = async (tokenId, data) => {
    try {
      const newOrder = await commerce.checkout.capture(tokenId, data);
      setOrder(newOrder);
      refreshCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [setCart]);

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
            <Route
              path="/checkout"
              element={
                <Checkout
                  cartId={cart.id}
                  captureOrder={captureOrder}
                  order={order}
                />
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
