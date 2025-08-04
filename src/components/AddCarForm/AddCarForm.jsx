import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  LinearProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import Dropzone from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const AddCarForm = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(50); // Simulated progress

  const handleDrop = (acceptedFiles) => {
    const previews = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(previews);
  };

  const formik = useFormik({
    initialValues: {
      carTitle: '',
      carBrand: '',
      carRentPrice: '',
      carCapacity: '',
      carType: '',
      carLocation: '',
    },
    onSubmit: (values) => {
      if (files.length === 0) {
        alert('Please upload at least one image.');
        return;
      }
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add a Car for Rent
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Please enter your car info
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {[
            ['carTitle', 'Car Title'],
            ['carBrand', 'Car Brand'],
            ['carRentPrice', 'Rent Price ($)'],
            ['carCapacity', 'Capacity'],
            ['carType', 'Car Type'],
            ['carLocation', 'Location'],
          ].map(([name, label], index) => (
            <Grid key={name} item xs={12} sm={6}>
              <TextField
                fullWidth
                label={label}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
              />
            </Grid>
          ))}

          {/* Upload Section */}
          <Grid item xs={12}>
            <Dropzone onDrop={handleDrop} maxFiles={1} accept={{ 'image/*': [] }}>
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  sx={{
                    border: '2px dashed #1976d2',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: '#f0f4ff',
                  }}
                >
                  <input {...getInputProps()} />
                  <UploadFileIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="body1" mt={1}>
                    Drag and drop an image, or click to browse
                  </Typography>
                  <Typography variant="caption">
                    High resolution images (png, jpg, gif)
                  </Typography>
                </Box>
              )}
            </Dropzone>
          </Grid>

          {/* File Upload Preview */}
          {files.length > 0 && (
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                {files.map((file, i) => (
                  <Box key={i}>
                    <Typography variant="body2">
                      Uploaded file: {file.name || 'car_front.jpg'}
                    </Typography>
                    <Typography variant="caption">2.5 MB of 5.1 MB</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddCarForm;
