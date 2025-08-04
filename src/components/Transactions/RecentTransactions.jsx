import React from 'react';
import { Card, Typography, Box, Stack, Divider } from '@mui/material';

const RecentTransactions = ({ transactions }) => {
  return (
    <Card sx={{ borderRadius: 2, mt: 3, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Recent Transactions</Typography>
        <Typography
          variant="body2"
          sx={{ color: '#1976d2', cursor: 'pointer', fontWeight: 'bold' }}
        >
          View All
        </Typography>
      </Box>

      <Stack spacing={2}>
        {transactions.slice(0, 4).map((tx, index) => (
          <React.Fragment key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  component="img"
                  src={tx.image}
                  alt={tx.name}
                  sx={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 1 }}
                />
                <Box>
                  <Typography variant="body1" fontWeight={600}>{tx.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#888', fontSize: '0.8rem' }}>{tx.type}</Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ color: '#888', fontSize: '0.8rem' }}>
                  {tx.transactionTime || 'N/A'}
                </Typography>
                <Typography variant="body1" fontWeight={600}>${tx.price}</Typography>
              </Box>
            </Box>

            {index < 3 && <Divider />}
          </React.Fragment>
        ))}
      </Stack>
    </Card>
  );
};

export default RecentTransactions;
