import React from "react";
import { Box, Typography, Button } from "@mui/material";
import car from "/src/assets/cars/car2.png"; // Hoặc car3.png nếu bạn muốn đổi

const SingleFeaturedCard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#036fdc",
        borderRadius: 4,
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 8 },
        position: "relative",
        color: "white",
        overflow: "hidden",
        '&::before': {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          opacity: 0.3,
          zIndex: 0,
        },
      }}
    >
      {/* Nội dung chữ */}
      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 500 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            fontWeight: "bold",
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          The Best Platform for Car Rental
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            opacity: 0.9,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            maxWidth: 400,
            mb: 3,
          }}
        >
          Ease of doing a car rental safely and reliably. Of course at a low price.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#fff",
            color: "#036fdc",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 1,
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: "#e3e3e3",
            },
          }}
        >
          Rental Car
        </Button>
      </Box>

      {/* Ảnh nằm chính giữa dưới cùng */}
      <Box
        component="img"
        src={car}
        alt="Car"
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-30%)",
          width: "100%",
          maxWidth: { xs: 300, sm: 380, md: 450 },
          objectFit: "contain",
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default SingleFeaturedCard;
