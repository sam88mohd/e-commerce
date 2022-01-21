import { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

const useFetch = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await commerce.products.list();
        setItems(data);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  return { items, error };
};

export default useFetch;
