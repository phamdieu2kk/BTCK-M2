import React, { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import CarCard from "../../components/CarCard/CarCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Favorites = () => {
  const [favoriteCars, setFavoriteCars] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCars");
    if (storedFavorites) {
      setFavoriteCars(JSON.parse(storedFavorites));
    }
  }, []);

  const handleUnfavorite = (id) => {
    const updated = favoriteCars.filter((car) => car.id !== id);
    setFavoriteCars(updated);
    localStorage.setItem("favoriteCars", JSON.stringify(updated));
  };

  return (
    <>
      <Header />
      <Container
        sx={{
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          My Favorites
        </Typography>

        {favoriteCars.length === 0 ? (
          <Typography variant="body1">
            Bạn chưa thêm xe nào vào danh sách yêu thích.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {favoriteCars.map((car) => (
              <Box
                key={car.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 12px)",
                    md: "calc(25% - 18px)",
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    height: "100%",
                  }}
                >
                  <CarCard car={car} onUnfavorite={handleUnfavorite} />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Favorites;
