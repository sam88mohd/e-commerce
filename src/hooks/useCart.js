import { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

const useCart = () => {
  const [cart, setCart] = useState({});
  const [error, setError] = useState({});

  const handleAddToCart = async (productId, quantity) => {
    try {
      const item = await commerce.cart.add(productId, quantity);
      setCart(item.cart);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const item = await commerce.cart.empty();
      setCart(item.cart);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveItemInCart = async (productId) => {
    try {
      const item = await commerce.cart.remove(productId);
      setCart(item.cart);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateItemInCart = async (productId, quantity) => {
    if (quantity > 0) {
      try {
        const item = await commerce.cart.update(productId, { quantity });
        setCart(item.cart);
      } catch (err) {
        console.log(err);
      }
    }
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
  }, [setCart]);
  return {
    cart,
    error,
    handleAddToCart,
    handleEmptyCart,
    handleRemoveItemInCart,
    handleUpdateItemInCart,
  };
};

export default useCart;
