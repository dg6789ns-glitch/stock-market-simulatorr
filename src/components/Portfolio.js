import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Chip, Modal, TextField, } from '@mui/material';

// Dummy owned stocks data (simulate bought stocks)
const initialPortfolio = [
  { symbol: 'TCS', qty: 10, buyPrice: 3500, currentPrice: 3560 },
  { symbol: 'INFY', qty: 5, buyPrice: 1500, currentPrice: 1523 },
];

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [sellModal, setSellModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [sellQty, setSellQty] = useState('');

  const handleSellClick = (stock) => {
    setSelectedStock(stock);
    setSellModal(true);
    setSellQty('');  // Reset quantity
  };

  const handleSellConfirm = () => {
    const qtyToSell = parseInt(sellQty);
    if (qtyToSell > 0 && qtyToSell <= selectedStock.qty) {
      // Dummy sell logic: Remove sold quantity or stock if qty becomes 0
      setPortfolio(prev =>
        prev.map(stock =>
          stock.symbol === selectedStock.symbol
            ? { ...stock, qty: stock.qty - qtyToSell }
            : stock
        ).filter(stock => stock.qty > 0)  // Remove if qty is 0
      );
      alert(`Sold ${qtyToSell} shares of ${selectedStock.symbol} for ₹${(qtyToSell * selectedStock.currentPrice).toFixed(2)}`);
      setSellModal(false);
    } else {
      alert('Invalid quantity');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Portfolio</Typography>
      <Table sx={{ borderRadius: 2, boxShadow: 2 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>Symbol</TableCell>
            <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
            <TableCell sx={{ color: 'white' }}>Buy Price</TableCell>
            <TableCell sx={{ color: 'white' }}>Current Price</TableCell>
            <TableCell sx={{ color: 'white' }}>P/L</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolio.map(stock => {
            const pl = (stock.currentPrice - stock.buyPrice) * stock.qty;
            return (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.qty}</TableCell>
                <TableCell>₹{stock.buyPrice.toFixed(2)}</TableCell>
                <TableCell>₹{stock.currentPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={`₹${pl.toFixed(2)}`}
                    color={pl > 0 ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="contained" color="secondary" onClick={() => handleSellClick(stock)}>
                    Sell
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Sell Modal */}
      <Modal open={sellModal} onClose={() => setSellModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Sell {selectedStock?.symbol}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Available Quantity: {selectedStock?.qty}
          </Typography>
          <TextField
            label="Quantity to Sell"
            type="number"
            fullWidth
            value={sellQty}
            onChange={(e) => setSellQty(e.target.value)}
            inputProps={{ min: 1, max: selectedStock?.qty }}
            sx={{ mb: 2 }}
          />
          {sellQty && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Sale Amount: ₹{(parseInt(sellQty) * (selectedStock?.currentPrice || 0)).toFixed(2)}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={() => setSellModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSellConfirm}>Confirm Sell</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
