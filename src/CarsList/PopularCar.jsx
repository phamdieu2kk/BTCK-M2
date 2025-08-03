import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Thêm dòng này
import "swiper/css";

import CarCard from "../components/CarCard/CarCard";

const PopularCar = ({ cars = [], itemsPerView = 3 }) => {
  return (
    <Box px={{ xs: 2, md: 4 }} mb={4}>
      {/* Header gồm title và button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Popular Cars
        </Typography>
        <Button
          variant="text"
          component={Link}
          to="/category"
          sx={{ textTransform: "none" }}
        >
          View All
        </Button>
      </Box>

      {/* Slider hiển thị xe */}
      <Swiper
  modules={[Autoplay]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  spaceBetween={16}
  slidesPerView={itemsPerView}
  observer={true}                 // 👈 thêm dòng này
  observeParents={true}          // 👈 thêm dòng này
  breakpoints={{
    0: { slidesPerView: 1 },
    600: { slidesPerView: 2 },
    900: { slidesPerView: itemsPerView },
  }}
>

        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            <CarCard car={car} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PopularCar;
