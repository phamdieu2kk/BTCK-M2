import React from "react";
import { Box, Typography, Rating, Divider } from "@mui/material";
import mockReviews from "../data/mockReviews";

const ReviewList = ({ carId }) => {
  const reviews = mockReviews.filter((review) => review.carId === carId);

  if (reviews.length === 0) {
    return <Typography>Chưa có đánh giá cho xe này.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Đánh giá từ người dùng
      </Typography>
      {reviews.map((review) => (
        <Box key={review.id} mb={2}>
          <Typography fontWeight="bold">{review.user}</Typography>
          <Rating value={review.rating} precision={0.1} readOnly />
          <Typography variant="body2" color="text.secondary">
            {review.date}
          </Typography>
          <Typography mt={1}>{review.comment}</Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default ReviewList;
