import React from "react";
import { Box } from "@mui/material";
import PickUp from "../PickUp/PickUp";
import DropOff from "../DropOff/DropOff";
import LocationSwitcher from "../LocationSwitcher/LocationSwitcher";

const PickUpDropOff = () => {
  return (
    <Box
      sx={{
        display: { xs: "block", md: "flex" },
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        gap: 1,
        mt: 3,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 280 }}>
        <PickUp />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: 48 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: { xs: 1, md: 0 },
        }}
      >
        <LocationSwitcher />
      </Box>

      <Box sx={{ flex: 1, minWidth: 280 }}>
        <DropOff />
      </Box>
    </Box>
  );
};

export default PickUpDropOff;
