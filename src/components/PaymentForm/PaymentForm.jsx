import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import displayRazorpay from "../../utils/PaymentGateway";

export default function PaymentForm({ handleBack, formValues }) {
  const formData = {};

  Object.keys(formValues).forEach((item) => {
    formData[item] = formValues[item].value;
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Product Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt="The house from the offer."
            src="https://picsum.photos/id/30/400/300"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
          <Typography sx={{ mb: 1 }}>Product Name: Jug 5x100</Typography>
          <Typography sx={{ mb: 1 }}>
            Product Desc: Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Minima.
          </Typography>
          <Typography>
            Product Price: <span style={{ fontWeight: "700" }}>Rs 500</span>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={() => displayRazorpay(formData)}
        >
          Place order
        </Button>
      </Box>
    </React.Fragment>
  );
}
