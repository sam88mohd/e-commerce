import { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

const useCart = () => {
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

  const handleRemoveItemInCart = async (productId) => {
    const item = await commerce.cart.remove(productId);
    setCart(item.cart);
  };

  const handleUpdateItemInCart = async (productId, quantity) => {
    if (quantity > 0) {
      const item = await commerce.cart.update(productId, { quantity });
      setCart(item.cart);
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
