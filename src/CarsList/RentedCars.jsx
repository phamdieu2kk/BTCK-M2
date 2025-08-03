import React from "react";
import { Box, Typography } from "@mui/material";
import CarCard from "../components/CarCard/CarCard";

// Import hook trực tiếp từ file context
import { useCarsContext } from "../contexts/CarsContext";

const RentedCars = () => {
  const { cars } = useCarsContext();

  return (
    <Box>
      <Typography variant="h4">Danh sách xe đã thuê</Typography>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </Box>
  );
};

export default RentedCars;
