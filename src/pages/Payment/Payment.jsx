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
  Stack,
} from "@mui/material";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PayPalIcon from "@mui/icons-material/AccountBalanceWallet"; // Changed to AccountBalanceWallet
import SecurityIcon from "@mui/icons-material/Security";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PickUp from "../../components/PickUp/PickUp";
import DropOff from "../../components/DropOff/DropOff";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Payment = () => {
  const location = useLocation();
  const selectedCar = location.state?.car;

  // Form data và errors
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");

  // State for credit card details (only if handling directly, generally avoided on frontend)
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [creditCardErrors, setCreditCardErrors] = useState({});

  // Ngày thuê
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));

  // Giá và giảm giá
  const [price] = useState(selectedCar?.price || 0);
  const [discount, setDiscount] = useState(0);

  // Promo code
  const [promoCode, setPromoCode] = useState("");

  // Checkbox
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Loading state for payment processing
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!selectedCar) {
    return (
      <Typography variant="h6" color="error">
        No car selected for payment.
      </Typography>
    );
  }

  // Tính toán days và total trực tiếp trong render
  const diff = endDate.diff(startDate, "day");
  const days = diff > 0 ? diff : 1;
  const baseTotal = days * price;
  const total = baseTotal - baseTotal * discount;

  // Xử lý input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý credit card input
  const handleCreditCardInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form đơn giản
  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{9,15}$/.test(formData.phone.trim())) {
      errors.phone = "Phone number is invalid";
    }
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validateCreditCardDetails = () => {
    let errors = {};
    if (selectedPaymentMethod === "credit-card") {
      if (!creditCardDetails.cardNumber.trim())
        errors.cardNumber = "Card number is required";
      else if (!/^\d{16}$/.test(creditCardDetails.cardNumber.trim()))
        errors.cardNumber = "Invalid card number";
      if (!creditCardDetails.expiryDate.trim())
        errors.expiryDate = "Expiry date is required";
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(creditCardDetails.expiryDate.trim()))
        errors.expiryDate = "Invalid expiry date (MM/YY)";
      if (!creditCardDetails.cvv.trim()) errors.cvv = "CVV is required";
      else if (!/^\d{3,4}$/.test(creditCardDetails.cvv.trim()))
        errors.cvv = "Invalid CVV";
    }
    setCreditCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý đổi phương thức thanh toán
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setCreditCardDetails({ cardNumber: "", expiryDate: "", cvv: "" }); // Clear card details on method change
    setCreditCardErrors({}); // Clear card errors on method change
  };

  // Xử lý promo code input
  const handlePromoChange = (e) => setPromoCode(e.target.value);

  // Áp dụng promo code
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "rent10") {
      setDiscount(0.1);
      alert("Promo code applied: 10% discount!");
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  // Simulate payment processing
  const simulatePayment = async (method, details) => {
    setIsProcessingPayment(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsProcessingPayment(false);
        // Simulate success or failure
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true, message: "Payment processed successfully!" });
        } else {
          resolve({ success: false, message: "Payment failed. Please try again." });
        }
      }, 2000); // Simulate network delay
    });
  };

  // Xử lý submit
  const handleRentNow = async () => {
    if (!validateForm()) {
      alert("❌ Please check the form fields.");
      return;
    }

    if (!agreeTerms) {
      alert("❌ You need to agree to the terms and privacy policy.");
      return;
    }

    // Payment specific validation and processing
    let paymentSuccess = true;
    let paymentMessage = "";

    if (selectedPaymentMethod === "credit-card") {
      if (!validateCreditCardDetails()) {
        alert("❌ Please enter valid credit card details.");
        return;
      }
      // In a real application, you would send creditCardDetails to your backend here
      // Your backend would then interact with a payment gateway like Stripe, Braintree, etc.
      console.log("Processing Credit Card payment with details:", creditCardDetails);
      const result = await simulatePayment("credit-card", creditCardDetails); // Simulate API call
      paymentSuccess = result.success;
      paymentMessage = result.message;

    } else if (selectedPaymentMethod === "paypal") {
      // For PayPal, you typically redirect to PayPal's site or use their SDK for a pop-up
      // This is a placeholder for initiating the PayPal flow.
      console.log("Initiating PayPal payment...");
      const result = await simulatePayment("paypal", {}); // Simulate API call
      paymentSuccess = result.success;
      paymentMessage = result.message;

    } else if (selectedPaymentMethod === "momo") {
      // For Momo, you would typically generate a payment link or QR code via your backend
      // and then direct the user to open the Momo app or scan the QR.
      console.log("Initiating Momo payment...");
      const result = await simulatePayment("momo", {}); // Simulate API call
      paymentSuccess = result.success;
      paymentMessage = result.message;

    } else if (selectedPaymentMethod === "vnpay") {
      // Similar to Momo, VNPay often involves redirection to their payment portal
      // or displaying a QR code for app scanning.
      console.log("Initiating VNPay payment...");
      const result = await simulatePayment("vnpay", {}); // Simulate API call
      paymentSuccess = result.success;
      paymentMessage = result.message;

    } else if (selectedPaymentMethod === "bank") {
      // For bank transfer, you would provide bank account details to the user
      // and explain that they need to transfer the money manually.
      console.log("Instructing for Bank Transfer...");
      paymentSuccess = true;
      paymentMessage = `✅ Your order is placed! Please transfer ${total.toFixed(2)}$ to our bank account: 123-456-789 (Bank Name: Example Bank). Your booking will be confirmed upon successful transfer.`;

    } else if (selectedPaymentMethod === "cash") {
      paymentSuccess = true;
      paymentMessage = `✅ Rental successful!
Payment method: Cash.
➡ Please go to the selected pickup location and pay directly.`;
    }

    if (paymentSuccess) {
      alert(paymentMessage);
      // TODO: Gửi dữ liệu về backend sau khi thanh toán thành công
      // Example: await fetch('/api/rent-car', { method: 'POST', body: JSON.stringify({ ...formData, selectedCar, startDate, endDate, total, selectedPaymentMethod }) });
    } else {
      alert(`❌ Payment failed! ${paymentMessage}`);
    }
  };

  return (
    <>
      <Header />
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
                <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    placeholder="Your name"
                    sx={{ flex: "1 1 45%" }}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    placeholder="Phone number"
                    sx={{ flex: "1 1 45%" }}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    placeholder="Address"
                    sx={{ flex: "1 1 45%" }}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!formErrors.address}
                    helperText={formErrors.address}
                  />
                  <TextField
                    fullWidth
                    label="Town / City"
                    placeholder="Town or city"
                    sx={{ flex: "1 1 45%" }}
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={!!formErrors.city}
                    helperText={formErrors.city}
                  />
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

                <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
                  <RadioGroup
                    row
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                    name="payment-method"
                    sx={{ gap: 2, flexWrap: "wrap" }}
                  >
                    {/* Credit Card */}
                    <FormControlLabel
                      value="credit-card"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          sx={{
                            border: "1px solid",
                            borderColor:
                              selectedPaymentMethod === "credit-card"
                                ? "primary.main"
                                : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            backgroundColor:
                              selectedPaymentMethod === "credit-card"
                                ? "#F5F8FF"
                                : "transparent",
                            cursor: "pointer",
                            width: 200, // Added a fixed width for consistent sizing
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box display="flex" alignItems="center" gap={1}>
                              <CreditCardIcon />
                              <Typography>Credit Card</Typography>
                            </Box>
                            <Box>
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                                alt="Visa"
                                style={{ height: 16, marginRight: 4 }}
                              />
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                alt="Mastercard"
                                style={{ height: 16 }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      }
                    />

                    {/* PayPal */}
                    <FormControlLabel
                      value="paypal"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          sx={{
                            border: "1px solid",
                            borderColor:
                              selectedPaymentMethod === "paypal"
                                ? "primary.main"
                                : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            backgroundColor:
                              selectedPaymentMethod === "paypal"
                                ? "#F5F8FF"
                                : "transparent",
                            cursor: "pointer",
                            width: 200,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box display="flex" alignItems="center" gap={1}>
                              <PayPalIcon />
                              <Typography>PayPal</Typography>
                            </Box>
                            <img
                              src="https://www.paypalobjects.com/webstatic/mktg/logos/PP_Full_Color_CMYK.png"
                              alt="PayPal"
                              style={{ height: 20 }}
                            />
                          </Box>
                        </Box>
                      }
                    />

                    {/* Momo */}
                    <FormControlLabel
                      value="momo"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          sx={{
                            border: "1px solid",
                            borderColor:
                              selectedPaymentMethod === "momo"
                                ? "primary.main"
                                : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            backgroundColor:
                              selectedPaymentMethod === "momo"
                                ? "#F5F8FF"
                                : "transparent",
                            cursor: "pointer",
                            width: 200,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box display="flex" alignItems="center" gap={1}>
                              <img
                                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                alt="Momo"
                                style={{ height: 20 }}
                              />
                              <Typography>Momo</Typography>
                            </Box>
                          </Box>
                        </Box>
                      }
                    />

                    {/* VNPay */}
                    <FormControlLabel
                      value="vnpay"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          sx={{
                            border: "1px solid",
                            borderColor:
                              selectedPaymentMethod === "vnpay"
                                ? "primary.main"
                                : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            backgroundColor:
                              selectedPaymentMethod === "vnpay"
                                ? "#F5F8FF"
                                : "transparent",
                            cursor: "pointer",
                            width: 200,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box display="flex" alignItems="center" gap={1}>
                              <img
                                src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
                                alt="VNPay"
                                style={{ height: 20 }}
                              />
                              <Typography>VNPay</Typography>
                            </Box>
                          </Box>
                        </Box>
                      }
                    />

                    {/* Bank Transfer */}
                    <FormControlLabel
                      value="bank"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          sx={{
                            border: "1px solid",
                            borderColor:
                              selectedPaymentMethod === "bank"
                                ? "primary.main"
                                : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            backgroundColor:
                              selectedPaymentMethod === "bank"
                                ? "#F5F8FF"
                                : "transparent",
                            cursor: "pointer",
                            width: 200,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box display="flex" alignItems="center" gap={1}>
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                                alt="Bank"
                                style={{ height: 20 }}
                              />
                              <Typography>Bank Transfer</Typography>
                            </Box>
                          </Box>
                        </Box>
                      }
                    />

                    {/* Cash on Delivery */}
                    <FormControlLabel
                      value="cash"
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <Box
                          sx={{
                            border: "1px solid",
                            borderColor:
                              selectedPaymentMethod === "cash"
                                ? "primary.main"
                                : "#E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            backgroundColor:
                              selectedPaymentMethod === "cash"
                                ? "#F5F8FF"
                                : "transparent",
                            cursor: "pointer",
                            width: 200,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box display="flex" alignItems="center" gap={1}>
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/4359/4359961.png"
                                alt="Cash"
                                style={{ height: 24 }}
                              />
                              <Typography>Cash on Delivery</Typography>
                            </Box>
                          </Box>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {/* Conditional rendering for Credit Card details */}
                {selectedPaymentMethod === "credit-card" && (
                  <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      placeholder="XXXX XXXX XXXX XXXX"
                      name="cardNumber"
                      value={creditCardDetails.cardNumber}
                      onChange={handleCreditCardInputChange}
                      error={!!creditCardErrors.cardNumber}
                      helperText={creditCardErrors.cardNumber}
                      sx={{ flex: "1 1 100%" }}
                    />
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      placeholder="MM/YY"
                      name="expiryDate"
                      value={creditCardDetails.expiryDate}
                      onChange={handleCreditCardInputChange}
                      error={!!creditCardErrors.expiryDate}
                      helperText={creditCardErrors.expiryDate}
                      sx={{ flex: "1 1 45%" }}
                    />
                    <TextField
                      fullWidth
                      label="CVV"
                      placeholder="XXX"
                      name="cvv"
                      value={creditCardDetails.cvv}
                      onChange={handleCreditCardInputChange}
                      error={!!creditCardErrors.cvv}
                      helperText={creditCardErrors.cvv}
                      sx={{ flex: "1 1 45%" }}
                    />
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
                <FormGroup sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeMarketing}
                        onChange={(e) => setAgreeMarketing(e.target.checked)}
                      />
                    }
                    label="I agree with marketing emails."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                    }
                    label="I agree with the terms and privacy policy."
                  />
                </FormGroup>

                <Divider sx={{ my: 3 }} />
                <Stack direction="row" spacing={2} alignItems="center">
                  <SecurityIcon fontSize="large" color="action" />
                  <Box>
                    <Typography fontWeight={600}>All your data is safe</Typography>
                    <Typography variant="body2" color="text.secondary">
                      We use advanced security to protect your info.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Right Side - Summary */}
          <Box flex={1} sx={{ position: "sticky", top: 20, height: "fit-content" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Rental Summary
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <CardMedia
                    component="img"
                    image={selectedCar.image}
                    alt={selectedCar.name}
                    sx={{ width: 80, height: 50, objectFit: "contain", borderRadius: 1, mr: 2 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">{selectedCar.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ★★★★☆ 440+ Reviewer
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Price per day</Typography>
                  <Typography>${price.toFixed(2)}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Rental Days</Typography>
                  <Typography>{days} day(s)</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography>Tax</Typography>
                  <Typography>$0</Typography>
                </Box>

                <Box display="flex" gap={2} mb={2}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                      if (!newValue) return;
                      if (newValue.isAfter(endDate, "day")) {
                        setEndDate(newValue.add(1, "day"));
                      }
                      setStartDate(newValue);
                    }}
                    maxDate={endDate}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => {
                      if (!newValue) return;
                      if (newValue.isBefore(startDate, "day")) {
                        setEndDate(startDate.add(1, "day"));
                      } else {
                        setEndDate(newValue);
                      }
                    }}
                    minDate={startDate.add(1, "day")}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    mb: 2,
                    backgroundColor: "white",
                  }}
                >
                  <LocalOfferIcon sx={{ color: "#90A3BF", mr: 1 }} />
                  <TextField
                    variant="standard"
                    placeholder="Apply promo code"
                    fullWidth
                    value={promoCode}
                    onChange={handlePromoChange}
                    InputProps={{ disableUnderline: true }}
                    sx={{ "& .MuiInputBase-input::placeholder": { color: "#90A3BF", opacity: 1 } }}
                  />
                  <Button
                    sx={{ textTransform: "none", color: "text.secondary", fontWeight: 600 }}
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </Button>
                </Box>

                {/* Nút Rent Now nằm dưới phần giá */}
                <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" gap={2}>
                  <Box width="100%" display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Total Rental Price
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Based on selected days and car price
                      </Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={700} color="primary">
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ py: 1.5, textTransform: "none", fontWeight: 600 }}
                    onClick={handleRentNow}
                    disabled={isProcessingPayment} // Disable button during processing
                  >
                    {isProcessingPayment ? "Processing..." : "Rent Now"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Payment;