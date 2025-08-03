import React from 'react';
import { Box, Button, Typography, Avatar, Container } from '@mui/material';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useUser } from '../../contexts/UserContext';

const Profile = () => {
  const { user, updateUser, logout } = useUser();

  if (!user) return <Typography sx={{ p: 4 }}>Bạn chưa đăng nhập.</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* <Header /> */}

      <Container sx={{ flex: 1, py: 6 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar src={user.avatar} alt="Avatar" sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>SĐT: {user.phone}</Typography>
          <Typography>Địa chỉ: {user.address}</Typography>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() =>
                updateUser({
                  name: 'Nguyễn Văn B',
                  phone: '0999999999',
                })
              }
            >
              ✏️ Edit Profile
            </Button>
            <Button variant="contained" color="error" onClick={logout}>
              🚪 Logout
            </Button>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Profile;
