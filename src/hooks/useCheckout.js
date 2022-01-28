import { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";

const useCheckout = (cartId) => {
  // checkout state
  const [checkout, setCheckout] = useState({});
  const [countries, setCountries] = useState({});

  // handle async/ await fetch request from chec
  const handleCheckout = async () => {
    const res = await commerce.checkout.generateToken(cartId, { type: "cart" });
    setCheckout(res);
  };

  const retrieveCountries = async () => {
    const { countries } = await commerce.services.localeListCountries();
    setCountries(countries);
  };

  // fetch checkout
  useEffect(() => {
    handleCheckout();
    retrieveCountries();
  }, []);

  return { checkout, countries };
};

export default useCheckout;
