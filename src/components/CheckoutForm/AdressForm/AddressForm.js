import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../Checkout/styles";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";
import { commerce } from "../../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkout, test }) => {
  const classes = useStyles();
  const [shippingCountries, setShippingCountries] = useState({});
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState({});
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const defaultValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    zip: "",
  };

  const methods = useForm({ defaultValues }); // assign useForm to methods - can call function in useForm hook

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const getShippingCountries = async (checkoutId) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutId
      );
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const getSubdivisions = async (country) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        country
      );
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const options = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

  const getShippingOptions = async (checkoutId, country, subdivision) => {
    try {
      const res = await commerce.checkout.getShippingOptions(checkoutId, {
        country: country,
        region: subdivision,
      });
      setShippingOptions(res);
      setShippingOption(res[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getShippingCountries(checkout.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) getSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      getShippingOptions(checkout.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  const onSubmit = (data) =>
    test({ ...data, shippingCountry, shippingSubdivision, shippingOption });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      {/* component can access the methods in useForm */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <CustomInput label="First Name" name="firstName" required />
            <CustomInput label="Last Name" name="lastName" required />
            <CustomInput label="Address line 1" name="address" required />
            <CustomInput label="Email" name="email" required type="email" />
            <CustomInput label="City" name="city" required />
            <CustomInput label="ZIP / Postal Code" name="zip" required />
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Shipping Country"
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Shipping Subdivision"
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Shipping Option"
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              className={classes.button}
            >
              Back to Cart
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
