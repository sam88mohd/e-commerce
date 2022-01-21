import { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

const useFetchCart = () => {
  const [cart, setCart] = useState({});
  const [error, setError] = useState({});

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();
    setCart(item.cart);
  };

  useEffect(() => {
    (async () => {
      try {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
      } catch (err) {
        setError(err);
      }
    })();
  }, [setCart, handleEmptyCart, handleAddToCart]);
  return { cart, error, handleAddToCart, handleEmptyCart };
};

export default useFetchCart;
