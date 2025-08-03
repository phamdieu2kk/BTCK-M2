// src/components/NotificationPopover.jsx
import React, { useState } from "react";
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  const notifications = [
    "Bạn có 1 tin nhắn mới",
    "Khóa học mới vừa được đăng",
    "Cập nhật hồ sơ thành công",
  ];

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{ sx: { width: 250 } }}
      >
        <List dense>
          {notifications.map((note, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={note} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default NotificationPopover;
