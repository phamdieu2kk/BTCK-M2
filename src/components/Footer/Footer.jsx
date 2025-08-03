import React from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", mt: 4, pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          {/* Logo & description */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "#3563E9", letterSpacing: 1, mb: 1 }}
            >
              MORENT
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#1E1E1E", whiteSpace: "pre-line" }}
            >
              Our vision is to provide convenience
              {"\n"}
              and help increase your sales business.
            </Typography>
          </Box>

          {/* Links Section */}
          <Box
            sx={{
              display: "flex",
              flex: 2,
              flexWrap: "wrap",
              gap: 4,
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            {/* Company */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="black">
                Company
              </Typography>
              <MuiLink href="/about" color="black" underline="none" display="block">
                About Us
              </MuiLink>
              <MuiLink href="/careers" color="black" underline="none" display="block">
                Careers
              </MuiLink>
              <MuiLink href="/contact" color="black" underline="none" display="block">
                Contact
              </MuiLink>
            </Box>

            {/* Services */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="black">
                Services
              </Typography>
              <MuiLink href="/rent" color="black" underline="none" display="block">
                Car Rental
              </MuiLink>
              <MuiLink href="/pricing" color="black" underline="none" display="block">
                Pricing
              </MuiLink>
              <MuiLink href="/locations" color="black" underline="none" display="block">
                Locations
              </MuiLink>
            </Box>

            {/* Support + Social */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="black">
                Support
              </Typography>
              <MuiLink href="/help" color="black" underline="none" display="block">
                Help Center
              </MuiLink>
              <MuiLink href="/terms" color="black" underline="none" display="block">
                Terms of Service
              </MuiLink>
              <MuiLink href="/privacy" color="black" underline="none" display="block">
                Privacy Policy
              </MuiLink>

              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="black">
                  Follow us
                </Typography>
                <Box display="flex" gap={1}>
                  <IconButton href="https://facebook.com" sx={{ color: "black" }}>
                    <Facebook />
                  </IconButton>
                  <IconButton href="https://twitter.com" sx={{ color: "black" }}>
                    <Twitter />
                  </IconButton>
                  <IconButton href="https://linkedin.com" sx={{ color: "black" }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton href="/#Discord" sx={{ color: "black" }}>
                    <FaDiscord size={24} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#ccc" }} />

        <Box textAlign="center">
          <Typography variant="body2" color="black">
            © {new Date().getFullYear()} Morent. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
