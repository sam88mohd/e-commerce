import { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";

const useCheckout = () => {
  // checkout state
  const [checkout, setCheckout] = useState({});

  // handle async/ await fetch request from chec
  const handleCheckout = async () => {
    const res = await commerce.checkout.generateToken();
    setCheckout(res);
  };

  // fetch checkout
  useEffect(() => {
    handleCheckout();
  }, [checkout]);

  return { checkout };
};

export default useCheckout;
