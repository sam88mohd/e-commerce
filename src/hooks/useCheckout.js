import { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";

const useCheckout = (cartId) => {
  // checkout state
  const [checkout, setCheckout] = useState({});
  const [countries, setCountries] = useState({});

  // handle async/ await fetch request from chec
  const handleCheckout = async () => {
    try {
      const checkout = await commerce.checkout.generateToken(cartId, {
        type: "cart",
      });
      setCheckout(checkout);
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveCountries = async () => {
    try {
      const { countries } = await commerce.services.localeListCountries();
      setCountries(countries);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch checkout
  useEffect(() => {
    handleCheckout();
    retrieveCountries();
  }, []);

  return { checkout, countries };
};

export default useCheckout;
