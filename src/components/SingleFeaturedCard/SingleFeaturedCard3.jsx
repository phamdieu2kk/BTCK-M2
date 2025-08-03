import React from "react";
import { Box, Typography, Button } from "@mui/material";
import car from "/src/assets/cars/car3.png";

const SingleFeaturedCard3 = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={{ xs: "column", md: "row" }}
      sx={{
        bgcolor: "#f5f5f5",
        borderRadius: 3,
        padding: 4,
        gap: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Easy way to rent a car at a low price
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Providing cheap car rental services and safe and comfortable facilities.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Rent Car
        </Button>
      </Box>

      <Box
        component="img"
        src={car}
        alt="Car"
        sx={{
          width: { xs: "100%", sm: 400 },
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default SingleFeaturedCard3;
