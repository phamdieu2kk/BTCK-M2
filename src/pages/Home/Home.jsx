import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PickUpDropOff from "../../components/PickUpDropOff/PickUpDropOff";
import FeaturedCards from "../../components/FeaturedCards/FeaturedCards";
import PopularCar from "../../CarsList/PopularCar";
import RecomendationCar from "../../CarsList/RecomendationCar";
import mockCars from "../../data/mockCars";

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#fff" }}>
      <Header />

      {/* Featured Cards */}
      <Box sx={{ mt: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 6 } }}>
        <FeaturedCards />
      </Box>

      {/* Pick Up Drop Off */}
      <Box sx={{ mt: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 6 } }}>
        <PickUpDropOff />
      </Box>

      {/* Popular Cars */}
      <Box sx={{ mt: { xs: 6, md: 10 }, px: { xs: 2, sm: 3, md: 6 } }}>
        <PopularCar cars={mockCars} itemsPerView={4} />
      </Box>

      {/* Recommendation Cars */}
      <Box sx={{ mt: { xs: 6, md: 10 }, px: { xs: 2, sm: 3, md: 6 } }}>
        <RecomendationCar cars={mockCars} itemsPerRow={4} />
      </Box>

      {/* Show More Button */}
      <Box
        sx={{
          my: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 6 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/category" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1A1A1A",
              color: "#fff",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#333",
              },
              width: { xs: "100%", sm: "auto" },
            }}
            fullWidth
          >
            Show more cars
          </Button>
        </Link>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
