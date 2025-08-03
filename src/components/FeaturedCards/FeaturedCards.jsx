import React from "react";
import { Box } from "@mui/material";

import SingleFeaturedCard from "../SingleFeaturedCard/SingleFeaturedCard";
import SingleFeaturedCard2 from "../SingleFeaturedCard/SingleFeaturedCard2";

const FeaturedCards = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          backgroundColor: "#fff",
          borderRadius: 4,
         
          
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <SingleFeaturedCard />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <SingleFeaturedCard2 />
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedCards;
