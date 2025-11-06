import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

// Dummy OHLC data for candlesticks
const dummyCandleData = [
  { time: '10:00', open: 3500, high: 3520, low: 3490, close: 3510, sma: 3480 },
  { time: '10:05', open: 3510, high: 3530, low: 3500, close: 3525, sma: 3490 },
  { time: '10:10', open: 3525, high: 3540, low: 3515, close: 3530, sma: 3500 },
  { time: '10:15', open: 3530, high: 3550, low: 3520, close: 3540, sma: 3510 },
  { time: '10:20', open: 3540, high: 3560, low: 3530, close: 3550, sma: 3520 },
];

// Custom candlestick shape
const Candlestick = (props) => {
  const { payload, x, y, width, height } = props;
  if (!payload) return null;
  const { open, high, low, close } = payload;
  const isGreen = close > open;
  const color = isGreen ? '#4caf50' : '#f44336';
  const bodyHeight = Math.abs(close - open) * (height / (high - low));
  const bodyY = y + (high - Math.max(open, close)) * (height / (high - low));
  const wickTop = y;
  const wickBottom = y + height;

  return (
    <g>
      {/* Wick */}
      <line x1={x + width / 2} y1={wickTop} x2={x + width / 2} y2={wickBottom} stroke={color} strokeWidth={1} />
      {/* Body */}
      <rect
        x={x + width * 0.2}
        y={bodyY}
        width={width * 0.6}
        height={bodyHeight || 1}
        fill={color}
        stroke={color}
      />
    </g>
  );
};

export default function StockChart() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" gutterBottom>TCS Candlestick Chart</Typography>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dummyCandleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'open') return [`₹${value}`, 'Open'];
                  if (name === 'high') return [`₹${value}`, 'High'];
                  if (name === 'low') return [`₹${value}`, 'Low'];
                  if (name === 'close') return [`₹${value}`, 'Close'];
                  return [value, name];
                }}
              />
              {/* Candlesticks */}
              <Bar dataKey="high" fill="transparent" shape={<Candlestick />} />
              {/* SMA Line */}
              <Line type="monotone" dataKey="sma" stroke="#dc004e" strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Candles: Green (up), Red (down) | Red Dashed: 10-Point SMA Indicator
        </Typography>
      </Paper>
    </Box>
  );
}

