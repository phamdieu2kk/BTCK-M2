import React from "react";
import {
  Box,
  Typography,
  Radio,
  TextField,
  Divider,
  Stack,
} from "@mui/material";
import { usePickUpDropOffContext } from "../../contexts/PickUpDropOffContext";

const PickUp = () => {
  const {
    state,
    locationOneChange,
    dateOneChange,
    timeOneChange,
  } = usePickUpDropOffContext();

  return (
    <Box
  sx={{
    backgroundColor: "#fff",
    borderRadius: 3,
    p: 2, // 👈 giảm padding
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    height: "100%", // 👈 đảm bảo stretch trong flex
    display: "flex",
    flexDirection: "column",
  }}
>

      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Radio checked color="secondary" />
        <Typography fontWeight="bold">Pick-Up</Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
        }
      >
        <Box flex={1}>
          <Typography variant="body2" fontWeight="bold" mb={0.5}>
            Location
          </Typography>
          <TextField
            variant="standard"
            value={state.location1}
            onChange={(e) => locationOneChange(e.target.value)}
            fullWidth
            placeholder="Enter city"
          />
        </Box>

        <Box flex={1}>
          <Typography variant="body2" fontWeight="bold" mb={0.5}>
            Date
          </Typography>
          <TextField
            variant="standard"
            type="date"
            value={state.date1}
            onChange={(e) => dateOneChange(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box flex={1}>
          <Typography variant="body2" fontWeight="bold" mb={0.5}>
            Time
          </Typography>
          <TextField
            variant="standard"
            type="time"
            value={state.time1}
            onChange={(e) => timeOneChange(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default PickUp;
