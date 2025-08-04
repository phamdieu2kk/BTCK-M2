import React from "react";
import { Box, Typography } from "@mui/material";

const GoogleMap = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: 280,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
         
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.374305030908!2d106.70042367590943!3d10.782671959046195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee496826dbf%3A0x7159bc3e48e7d65!2zQ8O0bmcgdHkgVEhQIFRow6BuaCBQaMO6bmcgVGhp4bq_dCBUUCwgMjI3IFBoYW4gVGhp4bq_dCwgUXXhuqNuIDQsIFF14bqtbiAxLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1690207642387!5m2!1svi!2s"
        ></iframe>
      </Box>
    </Box>
  );
};

export default GoogleMap;
