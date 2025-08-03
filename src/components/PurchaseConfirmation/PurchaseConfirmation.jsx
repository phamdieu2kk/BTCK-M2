import React from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Button as MUIButton,
} from "@mui/material";
import { useModalContext } from "../../contexts/ModalContext";
import { stripeConfirmation } from "../../lib/stripeHelpers";

const PurchaseConfirmation = () => {
  const { isOpen, toggleModal } = useModalContext();

  const handleCheckout = () => {
    stripeConfirmation();
  };

  return (
    <Modal
      open={isOpen}
      onClose={toggleModal}
      aria-labelledby="modal-label"
      aria-describedby="confirmation-description"
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          mx: "auto",
          my: "20vh",
        }}
      >
        <Typography id="modal-label" variant="h6" component="h2" textAlign="center">
          Confirmation
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <MUIButton variant="contained" color="primary" onClick={handleCheckout}>
            Confirm
          </MUIButton>
          <MUIButton variant="outlined" color="secondary" onClick={toggleModal}>
            Cancel
          </MUIButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PurchaseConfirmation;
