import React, { useEffect, useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import CarCard from "../CarCard/CarCard"; // Đảm bảo bạn có component CarCard sử dụng MUI
import { CarsContext } from "../../contexts/CarsContext";

const Cars = () => {
  const { cars, resetFilters } = useContext(CarsContext);

  // Tự động reset filter mỗi lần vào trang
  useEffect(() => {
    if (typeof resetFilters === "function") resetFilters();
  }, [resetFilters]);

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: 600 }}
      >
        All Available Cars
      </Typography>

      {cars?.length ? (
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid
              key={car.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CarCard car={car} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", mt: 5, color: "text.secondary" }}
        >
          No cars found.
        </Typography>
      )}
    </Box>
  );
};

export default Cars;
