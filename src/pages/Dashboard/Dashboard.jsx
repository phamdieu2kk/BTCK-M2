import React, { useState, useMemo } from 'react';
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Box, Card, CardContent, Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  DirectionsCar as DirectionsCarIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  LocationOn as LocationOnIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  HelpOutline as HelpOutlineIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

import Header from '../../components/Header/Header';
import GoogleMap from '../../components/GoogleMap';
import PickUp from '../../components/PickUp/PickUp';
import DropOff from '../../components/DropOff/DropOff';
import RecentTransactions from '../../components/Transactions/RecentTransactions';
import StatCard from '../../components/Stats/StatCard';
import CarTypePieChart from '../../components/Charts/CarTypePieChart';
import mockCars from '../../data/mockCars';

const drawerWidth = 240;
const COLORS = ['#8A2BE2', '#FF4500', '#228B22', '#1E90FF', '#FFD700'];
const orderedPieDataNames = ['Compact Sedan', 'Coupe', 'SUV', 'Sedan', 'Sport'];

const currentRentalCar = {
  name: 'Toyota Camry HEV Top CE',
  type: 'Sedan',
  id: '#9761',
  pickupLocation: 'Semarang',
  pickupDate: '2022-07-20',
  pickupTime: '07:00',
  dropoffLocation: 'Semarang',
  dropoffDate: '2022-07-21',
  dropoffTime: '01:00',
  totalPrice: 60.0,
  image: 'https://drive.gianhangvn.com/image/toyota-camry-hv-zing-1-2385312j22961.jpg',
};

const statIcons = {
  revenue: <AttachMoneyIcon sx={{ color: '#28a745' }} />,
  customers: <PeopleIcon sx={{ color: '#1976d2' }} />,
  rented: <DirectionsCarIcon sx={{ color: '#ff9800' }} />,
};

const statColors = ['#e8f5e9', '#e3f2fd', '#fff3e0'];

const mainMenu = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'Cars', icon: <DirectionsCarIcon /> },
  { label: 'Customers', icon: <PeopleIcon /> },
  { label: 'Rentals', icon: <ReceiptIcon /> },
  { label: 'Locations', icon: <LocationOnIcon /> },
];

const preferences = [
  { label: 'Settings', icon: <SettingsIcon /> },
  { label: 'Account', icon: <AccountCircleIcon /> },
  { label: 'Help', icon: <HelpOutlineIcon /> },
];

const Dashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const totalRevenue = useMemo(
    () => mockCars.reduce((sum, car) => sum + (car.price || 0), 0),
    []
  );
  const carsRentedOut = useMemo(() => mockCars.length, []);

  const pieData = useMemo(() => {
    const count = mockCars.reduce((acc, car) => {
      acc[car.type] = (acc[car.type] || 0) + 1;
      return acc;
    }, {});
    return orderedPieDataNames
      .map(name => ({ name, value: count[name] || 0 }))
      .filter(item => item.value > 0);
  }, []);

  const statData = [
    { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: statIcons.revenue, color: statColors[0] },
    { title: 'Active Customers', value: '1,245', icon: statIcons.customers, color: statColors[1] },
    { title: 'Cars Rented Out', value: carsRentedOut.toString(), icon: statIcons.rented, color: statColors[2] },
  ];

  const renderSideMenu = (items) => items.map(({ label, icon }) => (
    <ListItem
      button
      key={label}
      onClick={() => setActivePage(label)}
      sx={{
        borderRadius: 1, mb: 1,
        bgcolor: activePage === label ? '#e0ebff' : 'transparent',
        color: activePage === label ? '#1976d2' : '#555',
        '&:hover': { bgcolor: '#e0ebff', color: '#1976d2' },
      }}
    >
      <ListItemIcon sx={{ color: activePage === label ? '#1976d2' : '#555' }}>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  ));

  const renderDashboard = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <Card sx={{ borderRadius: 2, mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Map View</Typography>
            <GoogleMap />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Box component="img" src={currentRentalCar.image} alt={currentRentalCar.name} sx={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 1 }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>{currentRentalCar.name}</Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>{currentRentalCar.type}</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <PickUp />
            <Divider sx={{ my: 2 }} />
            <DropOff />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Box>
                <Typography fontWeight={600}>Total Rental Price</Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>Overall price rental</Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>${currentRentalCar.totalPrice.toFixed(2)}</Typography>
            </Box>
          </CardContent>
        </Card>
        <StatCard data={statData} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 300 }}>
        <CarTypePieChart
          pieData={pieData}
          COLORS={COLORS}
          carsRentedOut={carsRentedOut}
          orderedPieDataNames={orderedPieDataNames}
          mockCars={mockCars}
        />
        <RecentTransactions transactions={mockCars} />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar><Header /></Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth, boxSizing: 'border-box', bgcolor: '#f8f9fa', borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="overline" color="#888">MAIN MENU</Typography>
          <List>{renderSideMenu(mainMenu)}</List>

          <Typography variant="overline" color="#888" sx={{ mt: 4 }}>PREFERENCES</Typography>
          <List>{renderSideMenu(preferences)}</List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
        <Toolbar />
        {activePage === 'Dashboard' ? renderDashboard() : (
          <Typography variant="h4" sx={{ mt: 4 }}>{activePage} Page - Under Construction</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
