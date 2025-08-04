import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const CarTypePieChart = ({
  pieData = [],
  COLORS = [],
  carsRentedOut = 0,
  orderedPieDataNames = [],
  mockCars = [],
  mockRentals = [],
}) => {
  // Đếm số lượt thuê theo loại xe
  const rentalCountByType = mockCars.reduce((acc, car) => {
    const count = mockRentals.filter((r) => r.carId === car.id).length;
    if (!acc[car.type]) acc[car.type] = 0;
    acc[car.type] += count;
    return acc;
  }, {});

  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 2,
        bgcolor: '#fff',
        border: '1px solid #f5f5f5',
        boxShadow: '0px 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Top 5 Car Rental
        </Typography>

        {/* Chart */}
        <Box sx={{ position: 'relative', height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  const carType = props.payload?.name;
                  const rentals = rentalCountByType[carType] || 0;
                  return [`${value} xe - ${rentals} lượt thuê`, carType];
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={700}>
              {carsRentedOut.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rental Car
            </Typography>
          </Box>
        </Box>

        {/* Custom Legend */}
        {/* Custom Legend (name left, rental count right) */}
<Box sx={{ mt: 3 }}>
  {orderedPieDataNames.map((name, index) => {
    const rentalCount = rentalCountByType[name] || 0;

    return (
      <Box
        key={name}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1.5,
          px: 0.5,
        }}
      >
        {/* Left: Color Dot + Car Type */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: COLORS[index % COLORS.length],
              mr: 1,
            }}
          />
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ color: '#263238' }}
          >
            {name}
          </Typography>
        </Box>

        {/* Right: Rental Count */}
        <Typography
          variant="body2"
          fontWeight={600}
          color="text.primary"
          sx={{ minWidth: 80, textAlign: 'right' }}
        >
          {`${rentalCount} lượt thuê`}
        </Typography>
      </Box>
    );
  })}
</Box>

      </CardContent>
    </Card>
  );
};

export default CarTypePieChart;
