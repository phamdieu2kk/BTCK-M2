import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { usePickUpDropOffContext } from "../../contexts/PickUpDropOffContext";

const LocationSwitcher = () => {
  const { state, locationOneChange, locationTwoChange, dateOneChange, dateTwoChange, timeOneChange, timeTwoChange } = usePickUpDropOffContext();

  const handleSwap = () => {
    locationOneChange(state.location2);
    locationTwoChange(state.location1);
    dateOneChange(state.date2);
    dateTwoChange(state.date1);
    timeOneChange(state.time2);
    timeTwoChange(state.time1);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Tooltip title="Swap">
        <IconButton
  onClick={handleSwap}
  sx={{
    backgroundColor: "#2962ff",
    color: "#fff",
    borderRadius: 0, // Bỏ bo tròn góc
    "&:hover": {
      backgroundColor: "#0039cb",
    },
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  }}
>
  <SwapVertIcon />
</IconButton>

      </Tooltip>
    </Box>
  );
};

export default LocationSwitcher;
