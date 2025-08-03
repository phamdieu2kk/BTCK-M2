import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';

const AsideLeft = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: {
      sport: true,
      suv: false,
      mpv: false,
      sedan: false,
      coupe: false,
      hatchback: false,
    },
    capacity: {
      two: true,
      four: false,
      six: false,
      eight: false,
    },
    price: 80,
  });

  // Update parent when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  const handleTypeChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      type: {
        ...prev.type,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleCapacityChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      capacity: {
        ...prev.capacity,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handlePriceChange = (_, newValue) => {
    setFilters((prev) => ({
      ...prev,
      price: newValue,
    }));
  };

  return (
    <Box sx={{ width: 280, p: 3, borderRight: '1px solid #eee' }}>
      <Typography variant="h6" gutterBottom>Search Filters</Typography>

      <Divider sx={{ my: 2 }} />

      {/* TYPE */}
      <Typography variant="subtitle1" gutterBottom>Type</Typography>
      <FormGroup>
        {[
          ['sport', 'Sport'],
          ['suv', 'SUV'],
          ['mpv', 'MPV'],
          ['sedan', 'Sedan'],
          ['coupe', 'Coupe'],
          ['hatchback', 'Hatchback'],
        ].map(([key, label]) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={filters.type[key]}
                onChange={handleTypeChange}
                name={key}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      {/* CAPACITY */}
      <Typography variant="subtitle1" gutterBottom>Capacity</Typography>
      <FormGroup>
        {[
          ['two', '2 Person'],
          ['four', '4 Person'],
          ['six', '6 Person'],
          ['eight', '8 or More'],
        ].map(([key, label]) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={filters.capacity[key]}
                onChange={handleCapacityChange}
                name={key}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      {/* PRICE */}
      <Typography variant="subtitle1" gutterBottom>Max Price</Typography>
      <Box px={1}>
        <Slider
          value={filters.price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          step={1}
          min={5}
          max={100}
        />
        <Typography variant="body2" align="right">
          Max: ${filters.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default AsideLeft;
