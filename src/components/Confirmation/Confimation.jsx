import React from "react";
import { Formik, Field, Form } from "formik";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import SecuritySafety from "../../assets/icon/SecuritySafety.png"; // Kiểm tra đường dẫn hình

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const Confirmation = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Formik
        initialValues={{
          newsletter: false,
          terms: false,
        }}
        onSubmit={async (values) => {
          await sleep(500);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Confirmation
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              We are getting to the end. Just few clicks and your rental is ready!
            </Typography>

            <FormGroup sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="newsletter"
                    checked={values.newsletter}
                    onChange={handleChange}
                  />
                }
                label="I agree with sending marketing and newsletter emails. No spam, promised!"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={values.terms}
                    onChange={handleChange}
                  />
                }
                label="I agree with our terms and conditions and privacy policy."
              />
            </FormGroup>

            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{ mt: 3, width: "100%", py: 1.5 }}
            >
              Submit
            </Button>

            <Divider sx={{ my: 4 }} />

            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                component="img"
                src={SecuritySafety}
                alt="Security icon"
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  All your data is safe
                </Typography>
                <Typography variant="body2">
                  We are using the most advanced security to provide you the best experience ever.
                </Typography>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Confirmation;
