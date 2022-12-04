import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function AddressForm({ formValues, setformValues }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        error: value === "",
        value,
      },
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={formValues.firstName.value}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            onChange={handleChange}
            error={formValues.firstName.error}
            helperText={
              formValues.firstName.error && formValues.firstName.errorMessage
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={formValues.lastName.value}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            onChange={handleChange}
            error={formValues.lastName.error}
            helperText={
              formValues.lastName.error && formValues.lastName.errorMessage
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={formValues.address.value}
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            onChange={handleChange}
            error={formValues.address.error}
            helperText={
              formValues.address.error && formValues.address.errorMessage
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={formValues.user_email.value}
            id="email"
            name="user_email"
            type="email"
            label="Email"
            fullWidth
            autoComplete="shipping address-line2"
            variant="outlined"
            onChange={handleChange}
            error={formValues.user_email.error}
            helperText={
              formValues.user_email.error && formValues.user_email.errorMessage
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={formValues.city.value}
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="outlined"
            onChange={handleChange}
            error={formValues.city.error}
            helperText={formValues.city.error && formValues.city.errorMessage}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={formValues.state.value}
            variant="outlined"
            id="state"
            name="state"
            label="State/Province/Region"
            onChange={handleChange}
            fullWidth
            error={formValues.state.error}
            helperText={formValues.state.error && formValues.state.errorMessage}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
