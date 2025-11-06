import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, Chip, Card, CardContent } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Dummy transaction data with buyPrice for P/L calculation
const dummyTransactions = [
  { date: '2023-10-01', symbol: 'TCS', action: 'Buy', qty: 10, price: 3500, buyPrice: 3500 },
  { date: '2023-10-02', symbol: 'INFY', action: 'Sell', qty: 5, price: 1523, buyPrice: 1500 },
  { date: '2023-10-03', symbol: 'HDFC', action: 'Buy', qty: 2, price: 1645, buyPrice: 1645 },
  { date: '2023-10-04', symbol: 'TCS', action: 'Sell', qty: 5, price: 3600, buyPrice: 3500 },
];

export default function Transactions() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ReceiptIcon sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Transaction History
        </Typography>
      </Box>
      
      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <CardContent sx={{ p: 0 }}>
          <Table sx={{ borderRadius: 3 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>  {/* Theme-aware background */}
                <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Symbol</TableCell>
                <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Action</TableCell>
                <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Qty</TableCell>
                <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>Original Price</TableCell>
                <TableCell sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>P/L</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyTransactions.map((t, i) => {
                const pl = (t.price - t.buyPrice) * t.qty;  // Profit/Loss calculation
                return (
                  <TableRow key={i} sx={{ '&:hover': { bgcolor: 'grey.50', transition: 'background-color 0.3s' } }}>
                    <TableCell>{t.date}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t.symbol}</TableCell>
                    <TableCell>
                      <Chip
                        label={t.action}
                        color={t.action === 'Buy' ? 'primary' : 'secondary'}
                        size="small"
                        icon={t.action === 'Buy' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      />
                    </TableCell>
                    <TableCell>{t.qty}</TableCell>
                    <TableCell>₹{t.price.toFixed(2)}</TableCell>
                    <TableCell>₹{t.buyPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={`₹${pl.toFixed(2)}`}
                        color={pl > 0 ? 'success' : pl < 0 ? 'error' : 'default'}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}
