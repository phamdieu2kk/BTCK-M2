import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AsideLeft from "../../components/AsideLeft/AsideLeft";
import PopularCar from "../../CarsList/PopularCar";
import RecomendationCar from "../../CarsList/RecomendationCar";
import PickUpDropOff from "../../components/PickUpDropOff/PickUpDropOff";

// Data
import mockCars from "../../data/mockCars";

const ITEMS_PER_PAGE = 9;

const Category = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const paginatedCars = mockCars.slice(0, page * ITEMS_PER_PAGE);
const popularCars = mockCars; // hoặc slice(0, 10) nếu bạn chỉ muốn top 10

  const recommendationCars = paginatedCars.slice(3);

  const handleShowMore = () => {
    if (page * ITEMS_PER_PAGE < mockCars.length) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
          {/* SIDEBAR - Mobile Drawer or Static on Desktop */}
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

          {/* MAIN CONTENT */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <PickUpDropOff />

            <Box mt={5}>
              <PopularCar cars={popularCars} itemsPerView={3} />
            </Box>

            <Box mt={5}>
              <RecomendationCar cars={recommendationCars} />
            </Box>

            {page * ITEMS_PER_PAGE < mockCars.length && (
              <Box mt={6} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShowMore}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    borderRadius: "12px",
                    textTransform: "none",
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  Show more cars
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Category;
