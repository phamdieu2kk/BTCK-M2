import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CarCard from "../components/CarCard/CarCard";

const RecomendationCar = ({ cars = [] }) => {
  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(max-width:900px)");
  const isMd = useMediaQuery("(max-width:1200px)");
  const location = useLocation();
  const isCategoryPage = location.pathname === "/category";

  let columns = 4;
  if (isCategoryPage) {
    if (isXs) columns = 1;
    else if (isSm) columns = 2;
    else columns = 3;
  } else {
    if (isXs) columns = 1;
    else if (isSm) columns = 2;
    else if (isMd) columns = 3;
    else columns = 4;
  }

  return (
    <Box px={{ xs: 2, md: 4 }} mb={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Recommendation Cars
        </Typography>

        {/* View All luôn hiển thị ở mọi trang */}
        <Button
          variant="text"
          component={Link}
          to="/category"
          sx={{ textTransform: "none" }}
        >
          View All
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 2,
        }}
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </Box>
    </Box>
  );
};

export default RecomendationCar;
