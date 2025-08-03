import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  InputBase,
  Button,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu"; // ✅ Bổ sung import thiếu

import NotificationPopover from "../NotificationPopover";

// Thông tin user mẫu
const userObject = {
  googleId: "1234567890",
  image: "https://i.pravatar.cc/150?img=12",
  name: "Nguyễn Văn A",
};

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const ServerLink = "http://localhost:9090";

  const login = () => {
    window.open(`${ServerLink}/auth/google/login`, "_self");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1.5 }}>
        {/* Logo + Search Group */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: "#3563E9",
              textDecoration: "none",
              letterSpacing: 1,
            }}
          >
            CARRENT
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F6F7F9",
              px: 2,
              py: 1,
              borderRadius: "50px",
              boxShadow: "0 0 0 1px #E0E0E0",
              width: { xs: "260px", sm: "320px", md: "450px" },
            }}
          >
            <SearchIcon sx={{ color: "#90A3BF", mr: 1 }} />
            <InputBase placeholder="Search something here" sx={{ flex: 1 }} />
            <IconButton onClick={() => navigate("/category")}>
              <TuneIcon sx={{ color: "#596780" }} />
            </IconButton>
          </Box>
        </Box>

        {/* Right Side Icons + User */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate("/favorites")}>
            <FavoriteIcon sx={{ color: "#596780" }} />
          </IconButton>

          <NotificationPopover />

          <IconButton onClick={() => navigate("/dashboard")}>
            <SettingsIcon sx={{ color: "#596780" }} />
          </IconButton>

          <IconButton>
            <MenuIcon sx={{ color: "#596780" }} />
          </IconButton>

          {/* User Avatar / Login */}
          <Stack direction="row" spacing={2} alignItems="center">
            {userObject?.googleId ? (
              <Link to="/profile">
                <Avatar
                  src={userObject?.image}
                  alt="User Avatar"
                  sx={{ width: 30, height: 30 }}
                />
              </Link>
            ) : (
              <Button onClick={login} variant="contained" color="primary">
                Login
              </Button>
            )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
