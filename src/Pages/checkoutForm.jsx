import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../components/AddressForm/AddressForm.jsx";
import PaymentForm from "../components/PaymentForm/PaymentForm.jsx";
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details"];

const theme = createTheme();

export default function Checkout() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues, setformValues] = React.useState({
    firstName: {
      value: "",
      error: false,
      errorMessage: "You must enter firstname",
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: "You must enter lastname",
    },
    address: {
      value: "",
      error: false,
      errorMessage: "You must enter address",
    },
    user_email: {
      value: "",
      error: false,
      errorMessage: "You must enter valid email",
    },
    city: {
      value: "",
      error: false,
      errorMessage: "You must enter city",
    },
    state: {
      value: "",
      error: false,
      errorMessage: "You must enter state",
    },
  });
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  React.useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const handleNext = () => {
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    let error = false;

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        error = true;
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: currentValue === "",
          },
        };
      }
    }
    if (!error) {
      setActiveStep(activeStep + 1);
    } else {
      setformValues(newFormValues);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm formValues={formValues} setformValues={setformValues} />
        );
      case 1:
        return <PaymentForm handleBack={handleBack} formValues={formValues} />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            flexGrow: 1,
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shop
              </Typography>
              <Button
                color="inherit"
                sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                {activeStep == 0 && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep == 0 && "Next"}
                    </Button>
                  </Box>
                )}
              </React.Fragment>
            )}
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    </div>
  );
}
