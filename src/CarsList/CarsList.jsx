import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Pagination,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import mockCars from "../data/mockCars";
import { useSnackbar } from "../contexts/SnackbarContext";

const FAVORITES_KEY = "favoriteCars";

const formatCurrencyUSD = (amount) =>
  amount != null
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(amount)
    : "";

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const carsPerPage = 9;

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setCars(mockCars);
    const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (carId) => {
    const isFav = favorites.includes(carId);
    const updatedFavorites = isFav
      ? favorites.filter((id) => id !== carId)
      : [...favorites, carId];

    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

    showSnackbar(
      isFav ? "Đã bỏ khỏi mục yêu thích" : "Đã thêm vào mục yêu thích 🚗",
      isFav ? "info" : "success"
    );
  };

  const currentCars = useMemo(() => {
    const start = (page - 1) * carsPerPage;
    const end = page * carsPerPage;
    return cars.slice(start, end);
  }, [page, cars]);

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box px={2} py={4}>
      <Typography variant="h4" mb={4}>
        Danh sách xe
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
        {currentCars.length > 0 ? (
          currentCars.map((car) => {
            const liked = favorites.includes(car.id);
            return (
              <Card
                key={car.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 16px)",
                    md: "calc(33.333% - 20px)",
                  },
                  borderRadius: 3,
                  boxShadow: 2,
                  position: "relative",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* ✅ Click ảnh để sang detailcar */}
                <Link to={`/detailcar/${car.id}`}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={car.image}
                    alt={car.name}
                    sx={{
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      "&:hover": { transform: "scale(1.03)" },
                      cursor: "pointer",
                      display: "block",
                    }}
                  />
                </Link>

                <IconButton
                  onClick={() => toggleFavorite(car.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#fff",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  {liked ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                    {car.name}
                  </Typography>
                  <Box display="flex" alignItems="baseline" gap={1}>
                    <Typography variant="body1" fontWeight={600} color="primary">
                      {formatCurrencyUSD(car.price)}
                    </Typography>
                    {car.originalPrice > car.price && (
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through", color: "error.main" }}
                      >
                        {formatCurrencyUSD(car.originalPrice)}
                      </Typography>
                    )}
                  </Box>
                </CardContent>

                {/* ✅ Button chuyển sang /payment */}
                <CardActions sx={{ justifyContent: "center", pb: 2, px: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/payment/${car.id}`}
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Rent Now
                  </Button>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <Typography variant="h6" sx={{ mt: 4 }}>
            Không có xe nào.
          </Typography>
        )}
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(cars.length / carsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default CarsList;
