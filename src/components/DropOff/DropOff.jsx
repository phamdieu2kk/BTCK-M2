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

const DropOff = () => {
  const { state, locationTwoChange, dateTwoChange, timeTwoChange } =
    usePickUpDropOffContext();

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
        <Radio checked={false} />
        <Typography fontWeight={600}>Drop-Off</Typography>
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
          <Typography fontWeight={600} variant="body2" mb={0.5}>
            Location
          </Typography>
          <TextField
            variant="standard"
            value={state.location2}
            onChange={(e) => locationTwoChange(e.target.value)}
            fullWidth
            placeholder="City"
          />
        </Box>

        <Box flex={1}>
          <Typography fontWeight={600} variant="body2" mb={0.5}>
            Date
          </Typography>
          <TextField
            variant="standard"
            type="date"
            value={state.date2}
            onChange={(e) => dateTwoChange(e.target.value)}
            fullWidth
          />
        </Box>

        <Box flex={1}>
          <Typography fontWeight={600} variant="body2" mb={0.5}>
            Time
          </Typography>
          <TextField
            variant="standard"
            type="time"
            value={state.time2}
            onChange={(e) => timeTwoChange(e.target.value)}
            fullWidth
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default DropOff;
