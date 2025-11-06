import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

export default function StopLossModal({ open, onClose, onConfirm }) {
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  const handleConfirm = () => {
    onConfirm({ stopLoss: parseFloat(stopLoss), takeProfit: parseFloat(takeProfit) });
    setStopLoss('');
    setTakeProfit('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        <Typography variant="h6" gutterBottom>Set Stop Loss & Take Profit</Typography>
        <TextField
          label="Stop Loss Price (₹)"
          type="number"
          fullWidth
          margin="normal"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
        />
        <TextField
          label="Take Profit Price (₹)"
          type="number"
          fullWidth
          margin="normal"
          value={takeProfit}
          onChange={(e) => setTakeProfit(e.target.value)}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm}>Confirm Buy</Button>
        </Box>
      </Box>
    </Modal>
  );
}
