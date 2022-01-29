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

const AddressForm = ({ countries, checkout, test }) => {
  const classes = useStyles();
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

  const getSubdivisions = async (country) => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        country
      );
      setShippingSubdivisions(subdivisions);
    } catch (err) {
      console.log(err);
    }
  };

  const getShippingOptions = async (checkoutId, country) => {
    try {
      const res = await commerce.checkout.getShippingOptions(checkoutId, {
        country: country,
      });
      setShippingOptions(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (shippingCountry) {
      getSubdivisions(shippingCountry);
      getShippingOptions(checkout.id, shippingCountry);
    }
  }, [shippingCountry]);

  const onSubmit = (data) =>
    test({ ...data, shippingCountry, shippingSubdivision, setShippingOption });

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
                {countries &&
                  Object.entries(countries).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                disabled={!shippingCountry}
                label="Shipping Subdivision"
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                disabled={shippingOptions.length === 0}
                label="Shipping Option"
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.description} - {option.price.formatted_with_symbol}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              component={Link}
              to="/cart"
              variant="contained"
              color="inherit"
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
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
