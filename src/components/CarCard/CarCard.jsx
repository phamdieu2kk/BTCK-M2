import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Snackbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

// Format USD
const formatCurrencyUSD = (amount) =>
  amount != null
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(amount)
    : "";

const featureIcons = [
  { icon: <LocalGasStationIcon fontSize="small" />, label: "50L" },
  { icon: <SettingsInputComponentIcon fontSize="small" />, label: "Auto" },
  { icon: <PeopleIcon fontSize="small" />, label: "4 People" },
];

const CarCard = ({ car, onUnfavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteCars")) || [];
    setIsFavorite(stored.some((item) => item.id === car.id));
  }, [car.id]);

  const handleToggleFavorite = () => {
    let updated = JSON.parse(localStorage.getItem("favoriteCars")) || [];

    if (isFavorite) {
      updated = updated.filter((c) => c.id !== car.id);
      setSnackbarMessage("Đã bỏ khỏi mục yêu thích");
      if (typeof onUnfavorite === "function") onUnfavorite(car.id);
    } else {
      updated.push(car);
      setSnackbarMessage("Đã thêm vào mục yêu thích");
    }

    localStorage.setItem("favoriteCars", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
    setSnackbarOpen(true);
  };

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#fff",
        overflow: "hidden",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.01)" },
      }}
    >
      <Box position="relative">
  <Link to={`/detailcar/${car.id}`}>
    <CardMedia
      component="img"
      image={car.image}
      alt={car.name}
      sx={{
        width: "100%",
        height: { xs: 160, sm: 180, md: 200 },
        objectFit: "cover",
        display: "block", // đảm bảo toàn bộ ảnh clickable
      }}
    />
  </Link>
  <IconButton
    onClick={handleToggleFavorite}
    sx={{
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: "white",
      "&:hover": { backgroundColor: "#f8f8f8" },
    }}
  >
    {isFavorite ? (
      <FavoriteIcon sx={{ color: "red" }} />
    ) : (
      <FavoriteBorderIcon />
    )}
  </IconButton>
</Box>


      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" noWrap>
            {car.name}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          {featureIcons.map((item, idx) => (
            <Box
              key={idx}
              display="flex"
              flexDirection="column"
              alignItems="center"
              flex={1}
              textAlign="center"
            >
              {item.icon}
              <Typography
                variant="body2"
                fontSize={12}
                color="text.secondary"
                mt={0.5}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
  >
    <Box>
      <Typography variant="subtitle1" color="primary" fontWeight={600}>
        {formatCurrencyUSD(car.price)} / day
      </Typography>
      {car.originalPrice > car.price && (
        <Typography
          variant="body2"
          sx={{ textDecoration: "line-through", color: "#888" }}
        >
          {formatCurrencyUSD(car.originalPrice)}
        </Typography>
      )}
    </Box>
   <Button
  variant="contained"
  color="primary"
  component={Link}
  to={`/payment/${car.id}`}
  state={{ car }} // truyền toàn bộ đối tượng car qua location.state
  sx={{
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 500,
    fontSize: 13,
    px: 2,
    py: 1,
    minWidth: "unset",
  }}
>
  Rent Now
</Button>

  </Box>
</CardActions>


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
};

export default CarCard;
