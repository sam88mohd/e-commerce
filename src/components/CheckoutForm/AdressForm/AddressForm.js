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

const AddressForm = ({ countries }) => {
  const classes = useStyles();
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState({});
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOption, setShippingOption] = useState("Malaysia");

  const defaultValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    zip: "",
  };

  const methods = useForm({ defaultValues }); // assign useForm to methods - can call function in useForm hook

  const retrieveSubdivisions = async (country) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      country
    );
    setShippingSubdivisions(subdivisions);
  };

  useEffect(() => {
    if (shippingCountry) {
      retrieveSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  const onSubmit = (data) => console.log(data);

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
                disabled={!shippingSubdivision}
                label="Shipping Option"
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {/* {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))} */}
              </TextField>
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button type="submit" variant="contained" color="inherit">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
