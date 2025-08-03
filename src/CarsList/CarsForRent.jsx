import React, { useContext } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import CarCard from "../components/CarCard/CarCard";
import { CarsContext } from "../contexts/CarsContext";
const CarsForRent = () => {
  const { cars } = useContext(CarsContext);

  return (
    <Box sx={{ mt: 6 }}>
      {/* Title Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          Cars for Rent
        </Typography>
        <Button variant="text" sx={{ textTransform: "none" }}>
          View All
        </Button>
      </Box>

      {/* Car Cards */}
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
            <CarCard car={car} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CarsForRent;
