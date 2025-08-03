import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DetailCar from '../../components/DetailCar/DetailCar';
import SearchBar from '../../components/SearchBar/SearchBar';
import AsideLeft from '../../components/AsideLeft/AsideLeft';
import CarsForRent from '../../CarsList/CarsForRent';
import RentedCars from '../../CarsList/RentedCars';




const CarDetails = () => {
  return (
    <Box>
      {/* Header Search Bar */}
      <SearchBar showSearchBar={true} showFilter={true} />

      {/* Main layout container */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <AsideLeft />
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <DetailCar />
              <RentedCars />
              <CarsForRent />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CarDetails;
