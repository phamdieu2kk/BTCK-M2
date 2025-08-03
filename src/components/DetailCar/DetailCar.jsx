import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Stack,
  Drawer,
  useTheme,
  useMediaQuery,
  Rating,
  Avatar, // Import Avatar for review images
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MenuIcon from "@mui/icons-material/Menu";

import { useParams, Link } from "react-router-dom"; // Import Link here

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AsideLeft from "../../components/AsideLeft/AsideLeft";
import mockCars from "../../data/mockCars"; // mockCars now contains prices in USD
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import CarCard from "../CarCard/CarCard"; // Assuming CarCard also needs to display prices, ensure it uses the same formatting

SwiperCore.use([Navigation]);

// Helper function to format the number to USD currency string
const formatCurrencyUSD = (amount) => {
  if (amount === null || amount === undefined) {
    return ""; // Return empty string or a default like "N/A" if price is not available
  }
  // Use Intl.NumberFormat for locale-sensitive formatting
  // 'en-US' locale for US English, 'currency' style, 'USD' currency code
  // minimumFractionDigits: 0 ensures no decimal points for whole dollars, or 2 for cents
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Set to 0 for whole dollars, or 2 for cents
  }).format(amount);

  return formattedPrice;
};

const DetailCar = () => {
  const { id } = useParams();
  const cars = mockCars;
  const car = cars.find((c) => c.id.toString() === id);

  const [mainImage, setMainImage] = useState(car?.thumbnailImages?.[0] || car?.image);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false); // State for showing all reviews

  // Mock reviews data, updated to match image details
  const allReviews = [
    {
      id: 1,
      name: "Alex Stanton",
      title: "CEO at BukaLapak",
      avatar: "https://i.pravatar.cc/150?img=1", // Placeholder avatar
      rating: 4.5,
      comment:
        "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
      date: "21 July 2022",
    },
    {
      id: 2,
      name: "Skylar Dias",
      title: "CEO at Amazon",
      avatar: "https://i.pravatar.cc/150?img=2", // Placeholder avatar
      rating: 4.0,
      comment:
        "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
      date: "20 July 2022",
    },
    {
      id: 3,
      name: "Minh Trần",
      title: "Marketing Manager",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      comment: "Xe chạy rất êm, tiết kiệm nhiên liệu, dịch vụ giao nhận nhanh gọn! Tuyệt vời.",
      date: "15 July 2022",
    },
    {
      id: 4,
      name: "Linh Nguyễn",
      title: "Software Engineer",
      avatar: "https://i.pravatar.cc/150?img=4",
      rating: 3.5,
      comment: "Good car, but the pickup process was a bit slow. Overall satisfied.",
      date: "12 July 2022",
    },
    {
      id: 5,
      name: "David Lee",
      title: "Journalist",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 4.5,
      comment: "Comfortable and powerful. Perfect for a long drive.",
      date: "10 July 2022",
    },
    // Adding more reviews to match the '13 Reviews' count in the image
    { id: 6, name: "Jessica White", title: "Dentist", avatar: "https://i.pravatar.cc/150?img=6", rating: 4, comment: "Smooth ride, clean car. Will recommend.", date: "08 July 2022" },
    { id: 7, name: "Chris Green", title: "Architect", avatar: "https://i.pravatar.cc/150?img=7", rating: 5, comment: "Top-notch service and vehicle quality!", date: "05 July 2022" },
    { id: 8, name: "Emily Brown", title: "Teacher", avatar: "https://i.pravatar.cc/150?img=8", rating: 3, comment: "Car was okay, bit old for my taste.", date: "03 July 2022" },
    { id: 9, name: "Michael Blue", title: "Artist", avatar: "https://i.pravatar.cc/150?img=9", rating: 4.5, comment: "Loved the design, very eye-catching.", date: "01 July 2022" },
    { id: 10, name: "Sarah Red", title: "Doctor", avatar: "https://i.pravatar.cc/150?img=10", rating: 5, comment: "Flawless experience from start to finish.", date: "28 June 2022" },
    { id: 11, name: "Daniel Black", title: "Engineer", avatar: "https://i.pravatar.cc/150?img=11", rating: 4, comment: "Good value for money, reliable car.", date: "25 June 2022" },
    { id: 12, name: "Olivia Grey", title: "Writer", avatar: "https://i.pravatar.cc/150?img=12", rating: 3.5, comment: "Decent car, but the GPS was a bit buggy.", date: "22 June 2022" },
    { id: 13, name: "James Gold", title: "Pilot", avatar: "https://i.pravatar.cc/150?img=13", rating: 5, comment: "Exceptional performance, truly a sports car.", date: "20 June 2022" },
  ];

  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 2);

  useEffect(() => {
    if (car?.thumbnailImages?.[0]) {
      setMainImage(car.thumbnailImages[0]);
    } else if (car?.image) {
      setMainImage(car.image);
    }
  }, [id, car]);

  if (!car) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <Container maxWidth="xl" sx={{ flexGrow: 1, my: 4 }}>
          <Typography variant="h6" mt={5}>
            Car not found for ID: {id}
          </Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  // Ensure car.reviewCount reflects the actual number of mock reviews
  if (car) {
    car.reviewCount = allReviews.length;
  }

  const recommendationCars = cars.filter((c) => c.id.toString() !== id);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#F6F7F9" }}>
      <Header />

      <Box sx={{ bgcolor: "#f9f9f9", flexGrow: 1, py: { xs: 3, md: 6 } }}>
        <Box
          sx={{
            maxWidth: "1440px",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 6 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 4,
          }}
        >
          {/* Sidebar */}
          {isMobile ? (
            <>
              <Box mb={2}>
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{
                    border: "1px solid #ccc",
                    bgcolor: "#fff",
                    borderRadius: 2,
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{ keepMounted: true }}
              >
                <Box sx={{ width: 280 }}>
                  <AsideLeft onCloseDrawer={() => setDrawerOpen(false)} />
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ width: 300, flexShrink: 0 }}>
              <AsideLeft />
            </Box>
          )}

          {/* Main Content */}
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            {/* 2 Columns */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              {/* Left Column */}
              <Box sx={{ flex: 1, minWidth: { md: "300px" }, display: "flex", flexDirection: "column" }}>
                {/* Banner */}
                <Box
                  sx={{
                    position: "relative",
                    backgroundColor: "#3563E9",
                    borderRadius: 2,
                    color: "white",
                    p: 3,
                    height: { xs: 250, md: 360 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    backgroundImage: `url(${mainImage})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(53, 99, 233, 0.8), rgba(53, 99, 233, 0))",
                      borderRadius: 2,
                    }}
                  />
                  <Box sx={{ zIndex: 1 }}>
                    <Typography variant="h5" fontWeight="bold">
                      Sports car with the best design and acceleration
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                      Safety and comfort while driving a futuristic and elegant sports car
                    </Typography>
                  </Box>
                </Box>

                {/* Thumbnails */}
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  mt={2}
                  sx={{
                    flexWrap: "wrap",
                    gap: { xs: 1, sm: 2 },
                  }}
                >
                  {(car.thumbnailImages || [car.image]).slice(0, 3).map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setMainImage(img)}
                      sx={{
                        width: { xs: 80, sm: 90 },
                        height: { xs: 56, sm: 64 },
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        border: mainImage === img ? "2px solid #3563E9" : "1px solid #ccc",
                        opacity: mainImage === img ? 1 : 0.7,
                        transition: "all 0.3s ease",
                        ":hover": {
                          transform: "scale(1.05)",
                          opacity: 1,
                        },
                      }}
                    >
                      <img
                        src={img}
                        alt={`thumb-${idx}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Right Column */}
              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#fff",
                  borderRadius: 2,
                  p: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  minWidth: { md: "300px" },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" fontWeight="bold">
                    {car.name}
                  </Typography>
                  <IconButton sx={{ color: "red" }}>
                    <FavoriteIcon />
                  </IconButton>
                </Box>

                <Box display="flex" alignItems="center" mt={1}>
                  <Rating
                    name="read-only"
                    value={car.rating}
                    precision={0.5}
                    readOnly
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    icon={<StarIcon fontSize="inherit" />}
                    sx={{ color: "#FBAD39" }}
                  />
                  <Typography variant="caption" color="text.secondary" ml={1}>
                    {car.reviewCount} Reviewer
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={2}
                  sx={{ textAlign: "justify", lineHeight: 1.6 }}
                >
                  {car.mainDescription}
                </Typography>

                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                  gap={2}
                  mt={3}
                >
                  <SpecItem label="Type Car" value={car.type} />
                  <SpecItem label="Capacity" value={car.capacityText} />
                  <SpecItem label="Steering" value={car.steering} />
                  <SpecItem label="Gasoline" value={car.gasoline} />
                </Box>

                {/* Price & Button */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={10}>
                  <Box>
                    <Typography variant="h6" color="primary">
                      {formatCurrencyUSD(car.price)}
                    </Typography>
                    {car.originalPrice && ( // Only display originalPrice if it exists
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through", color: "#888" }}
                      >
                        {formatCurrencyUSD(car.originalPrice)}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    component={Link} // Changed to Link component
                    to={`/payment/${car.id}`} // Added the 'to' prop for navigation
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    Rent Now
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Reviews Section */}
            <Box
              mt={5}
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                p: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <Box display="flex" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Reviews
                </Typography>
                <Box
                  sx={{
                    ml: 1,
                    bgcolor: "#3563E9",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {allReviews.length}
                </Box>
              </Box>

              <Stack spacing={3}>
                {displayedReviews.map((review) => (
                  <Box key={review.id} sx={{ display: "flex", gap: 2 }}>
                    <Avatar src={review.avatar} alt={review.name} sx={{ width: 48, height: 48, flexShrink: 0 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {review.name}
                          </Typography>
                          {review.title && (
                            <Typography variant="body2" color="text.secondary">
                              {review.title}
                            </Typography>
                          )}
                        </Box>
                        <Box textAlign="right">
                          <Rating
                            name={`review-rating-${review.id}`}
                            value={review.rating}
                            precision={0.5}
                            readOnly
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            icon={<StarIcon fontSize="inherit" />}
                            sx={{ color: "#FBAD39" }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {review.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {review.comment}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              {allReviews.length > 2 && ( // Only show button if there are more than 2 reviews
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="text"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    sx={{ textTransform: 'none', fontWeight: 600, color: '#90A3BF' }}
                  >
                    {showAllReviews ? 'Show Less' : 'Show All'}
                  </Button>
                </Box>
              )}
            </Box>

            {/* Recommendation Cars */}
            <Box
              mt={5}
              sx={{
                backgroundColor: "#fff",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Recommendation Cars
              </Typography>
              <Swiper
                spaceBetween={16}
                slidesPerView={3}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 2 },
                  960: { slidesPerView: 3 },
                }}
              >
                {recommendationCars.map((car) => (
                  <SwiperSlide key={car.id}>
                    {/* Ensure CarCard also uses the formatCurrencyUSD function if it displays prices */}
                    <CarCard car={car} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

const SpecItem = ({ label, value }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography fontWeight={500}>{value}</Typography>
  </Box>
);

export default DetailCar;