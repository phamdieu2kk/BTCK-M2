// src/components/Sidebar/SidebarMenu.jsx

import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

const SidebarMenu = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Cars', icon: <DirectionsCarIcon /> },
    { text: 'Customers', icon: <PeopleIcon /> },
    { text: 'Transactions', icon: <ReceiptIcon /> },
  ];

  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem button key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarMenu;
