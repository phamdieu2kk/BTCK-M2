import React from 'react';
import { Box } from '@mui/material';

import Header   from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileComponent from '../../components/Profile/Profile';

const Profile = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Nội dung chính của profile */}
      <Box sx={{ flex: 1, py: 4 }}>
        <ProfileComponent />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Profile;
