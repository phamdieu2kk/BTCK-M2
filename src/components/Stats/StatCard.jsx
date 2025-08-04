// src/components/StatCard/StatCard.jsx
import React from 'react';
import { Grid, Card, CardContent, Stack, Typography, Box } from '@mui/material';

const StatCard = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data.map((stat, i) => (
        <Grid item xs={12} sm={6} md={4} key={stat.title}>
          <Card sx={{ backgroundColor: stat.color, borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                {stat.icon}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#555' }}>{stat.title}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{stat.value}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCard;
