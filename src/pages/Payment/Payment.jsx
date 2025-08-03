import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Checkbox,
  FormGroup,
  Divider,
  Stack
} from "@mui/material";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PayPalIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SecurityIcon from "@mui/icons-material/Security";

import PickUp from "../../components/PickUp/PickUp";
import DropOff from "../../components/DropOff/DropOff";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <>
     <Header/>
      <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#F6F7F9" }}>
       
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          {/* Left Side */}
          <Box flex={2}>
            {/* Billing Info */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Billing Info{" "}
                  <Typography component="span" variant="body2" color="text.secondary">
                    Step 1 of 4
                  </Typography>
                </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                  Please enter your billing info
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                  <TextField fullWidth label="Name" placeholder="Your name" sx={{ flex: "1 1 45%" }} />
                  <TextField fullWidth label="Phone Number" placeholder="Phone number" sx={{ flex: "1 1 45%" }} />
                  <TextField fullWidth label="Address" placeholder="Address" sx={{ flex: "1 1 45%" }} />
                  <TextField fullWidth label="Town / City" placeholder="Town or city" sx={{ flex: "1 1 45%" }} />
                </Box>
              </CardContent>
            </Card>

            {/* Rental Info */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Rental Info{" "}
                  <Typography component="span" variant="body2" color="text.secondary">
                    Step 2 of 4
                  </Typography>
                </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                  Please select your rental date
                </Typography>
                <Box display="flex" gap={2} mt={2}>
                  <PickUp />
                  <DropOff />
                </Box>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Method{" "}
                  <Typography component="span" variant="body2" color="text.secondary">
                    Step 3 of 4
                  </Typography>
                </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                  Please enter your payment method
                </Typography>

                <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
                  <RadioGroup
                    row
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                    name="payment-method"
                    sx={{ gap: 2 }}
                  >
                    {/* Credit Card Option */}
                    <FormControlLabel
                      value="credit-card"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          gap={1}
                          sx={{
                            border: "1px solid",
                            borderColor: selectedPaymentMethod === "credit-card" ? "primary.main" : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            flexGrow: 1,
                            cursor: "pointer",
                            backgroundColor: selectedPaymentMethod === "credit-card" ? "#F5F8FF" : "transparent",
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            <CreditCardIcon />
                            <Typography>Credit Card</Typography>
                          </Box>
                          <Box>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{ height: 16, marginRight: 4 }} />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: 16 }} />
                          </Box>
                        </Box>
                      }
                    />

                    {/* PayPal Option */}
                    <FormControlLabel
                      value="paypal"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          gap={1}
                          sx={{
                            border: "1px solid",
                            borderColor: selectedPaymentMethod === "paypal" ? "primary.main" : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            flexGrow: 1,
                            cursor: "pointer",
                            backgroundColor: selectedPaymentMethod === "paypal" ? "#F5F8FF" : "transparent",
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            <PayPalIcon />
                            <Typography>PayPal</Typography>
                          </Box>
                          <img src="https://www.paypalobjects.com/webstatic/mktg/logos/PP_Full_Color_CMYK.png" alt="PayPal" style={{ height: 20 }} />
                        </Box>
                      }
                    />

                    {/* Bitcoin Option */}
                    <FormControlLabel
                      value="bitcoin"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          gap={1}
                          sx={{
                            border: "1px solid",
                            borderColor: selectedPaymentMethod === "bitcoin" ? "primary.main" : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            flexGrow: 1,
                            cursor: "pointer",
                            backgroundColor: selectedPaymentMethod === "bitcoin" ? "#F5F8FF" : "transparent",
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={1}>
                            <CurrencyBitcoinIcon />
                            <Typography>Bitcoin</Typography>
                          </Box>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" alt="Bitcoin" style={{ height: 20 }} />
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {selectedPaymentMethod === "credit-card" && (
                  <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                    <TextField fullWidth label="Card Number" placeholder="Card number" sx={{ flex: "1 1 45%" }} />
                    <TextField fullWidth label="Expiration Date" placeholder="MM/YY" sx={{ flex: "1 1 20%" }} />
                    <TextField fullWidth label="CVC" sx={{ flex: "1 1 20%" }} />
                    <TextField fullWidth label="Card Holder" sx={{ flex: "1 1 45%" }} />
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Confirmation */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Confirmation{" "}
                  <Typography component="span" variant="body2" color="text.secondary">
                    Step 4 of 4
                  </Typography>
                </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                  We are getting to the end. Just few clicks and your rental is ready!
                </Typography>

                <FormGroup sx={{ mt: 2 }}>
                  <FormControlLabel control={<Checkbox />} label="I agree with sending Marketing and newsletter emails. No spam, promised!" />
                  <FormControlLabel control={<Checkbox />} label="I agree with our terms and conditions and privacy policy." />
                </FormGroup>

                <Button variant="contained" color="primary"  sx={{ mt: 3, py: 1.5, textTransform: "none", fontWeight: 600 }}>
                  Rent Now
                </Button>

                <Divider sx={{ my: 3 }} />

                <Stack direction="row" spacing={2} alignItems="center">
                  <SecurityIcon fontSize="large" color="action" />
                  <Box>
                    <Typography fontWeight={600}>All your data is safe</Typography>
                    <Typography variant="body2" color="text.secondary">
                      We are using the most advanced security to provide you the best experience ever.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Right Side - Rental Summary */}
          <Box flex={1} sx={{ position: "sticky", top: 20, height: "fit-content" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Rental Summary
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Prices may change depending on the length of the rental and the price of your rental car.
                </Typography>

                <Box display="flex" alignItems="center" mb={2}>
                  <CardMedia
                    component="img"
                    image="https://cdn.pixabay.com/photo/2013/07/12/13/58/nissan-146989_960_720.png"
                    alt="car"
                    sx={{ width: 80, height: 50, objectFit: "contain", borderRadius: 1, mr: 2 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">Nissan GT - R</Typography>
                    <Typography variant="body2" color="text.secondary">★★★★☆ 440+ Reviewer</Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal</Typography>
                  <Typography>$80.00</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography>Tax</Typography>
                  <Typography>$0</Typography>
                </Box>

                {/* Promo code */}
                <Box display="flex" alignItems="center" sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  mb: 2,
                  backgroundColor: "white"
                }}>
                  <LocalOfferIcon sx={{ color: "#90A3BF", mr: 1 }} />
                  <TextField
                    variant="standard"
                    placeholder="Apply promo code"
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    sx={{ '& .MuiInputBase-input::placeholder': { color: '#90A3BF', opacity: 1 } }}
                  />
                  <Button sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 600 }}>Apply now</Button>
                </Box>

                {/* Total */}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h6" fontWeight={600}>Total Rental Price</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Overall price and includes rental discount
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={700} color="primary">$80.00</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Footer luôn nằm ngoài nội dung chính */}
      <Footer />
    </>
  );
};

export default Payment;
