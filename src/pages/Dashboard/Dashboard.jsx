import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TuneIcon from '@mui/icons-material/Tune';

import Header from '../../components/Header/Header';
import mockCars from '../../data/mockCars';

const drawerWidth = 240;
const COLORS = ['#1976d2', '#28a745', '#ffc107', '#ff5722', '#9c27b0'];

const Dashboard = () => {
  // Tính số lượng mỗi loại xe
  const carTypeCount = mockCars.reduce((acc, car) => {
    acc[car.type] = (acc[car.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(carTypeCount).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  // Tính tổng doanh thu
  const totalRevenue = mockCars.reduce((sum, car) => sum + (car.price || 0), 0);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#f8f9fa',
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography variant="overline" sx={{ mb: 1, color: '#888' }}>
            MAIN MENU
          </Typography>
          <List>
            {['Dashboard', 'Cars', 'Customers', 'Rentals', 'Locations'].map((text, index) => (
              <ListItem
                button
                key={text}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: index === 0 ? '#e0ebff' : 'transparent',
                  color: index === 0 ? '#1976d2' : '#555',
                  '&:hover': {
                    bgcolor: '#e0ebff',
                    color: '#1976d2',
                  },
                }}
              >
                <ListItemIcon sx={{ color: index === 0 ? '#1976d2' : '#555' }}>
                  {index === 0 && <DashboardIcon />}
                  {index === 1 && <DirectionsCarIcon />}
                  {index === 2 && <PeopleIcon />}
                  {index === 3 && <ReceiptIcon />}
                  {index === 4 && <LocationOnIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

          <Typography variant="overline" sx={{ mt: 4, mb: 1, color: '#888' }}>
            PREFERENCES
          </Typography>
          <List>
            {['Settings', 'Account', 'Help'].map((text) => (
              <ListItem button key={text} sx={{ borderRadius: 1, mb: 1 }}>
                <ListItemIcon sx={{ color: '#555' }}>
                  <TuneIcon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: '#555' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
        <Toolbar />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Map View */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#333' }}>
                  Map View
                </Typography>
                <Box
                  sx={{
                    bgcolor: '#e0ebff',
                    height: 250,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1976d2',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: '4rem', opacity: 0.5 }} />
                  Map Placeholder
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Pie Chart */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
                  Car Type Distribution
                </Typography>
                <Box sx={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                {/* Total Cars */}
                <Typography variant="body2" sx={{ color: '#666', mt: 2 }}>
                  Total Cars: {mockCars.length}
                </Typography>
              </CardContent>
            </Card>

            {/* Payment Summary Card */}
            <Card sx={{ borderRadius: 2, mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#333', mb: 1 }}>
                  Payment Summary
                </Typography>
                <Typography variant="body1" sx={{ color: '#444' }}>
                  Total Revenue:
                </Typography>
                <Typography variant="h5" sx={{ color: '#28a745', fontWeight: 600 }}>
                  ${totalRevenue.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
