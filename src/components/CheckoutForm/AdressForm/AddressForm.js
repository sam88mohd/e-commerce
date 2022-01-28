import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../Checkout/styles";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";

const AddressForm = ({ countries }) => {
  const classes = useStyles();
  const [shippingSubdivision, setShippingSubdivision] = useState("Malaysia");
  const [shippingOption, setShippingOption] = useState("Malaysia");

  const defaultValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    zip: "",
    shippingCountry: "",
  };
  const methods = useForm({ defaultValues }); // assign useForm to methods - can call function in useForm hook

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
                {...methods.register("shippingCountry")}
              >
                {Object.entries(countries).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Shipping Subdivision"
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
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
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}
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
