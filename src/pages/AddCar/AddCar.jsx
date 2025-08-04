import React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AddCarForm from '../../components/AddCarForm/AddCarForm';

const AddCar = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              {/* Confirmation nên được gọi bên trong AddCarForm */}
              <AddCarForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AddCar;
