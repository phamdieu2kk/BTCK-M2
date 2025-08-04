import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const RentalSummaryCard = ({ car }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Rental
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          <strong>Customer:</strong> {car.customer}
        </Typography>
        <Typography variant="body1">
          <strong>Car:</strong> {car.name}
        </Typography>
        <Typography variant="body1">
          <strong>Pickup:</strong> {car.pickupLocation}
        </Typography>
        <Typography variant="body1">
          <strong>Dropoff:</strong> {car.dropoffLocation}
        </Typography>
        <Typography variant="body1">
          <strong>Price:</strong> ${car.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RentalSummaryCard;
