import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Chip,
  
  Modal,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Dummy stocks
const dummyStocks = [
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3560, change: 0.5, sector: 'IT' },
  { symbol: 'INFY', name: 'Infosys', price: 1523, change: -0.2, sector: 'IT' },
  { symbol: 'HDFC', name: 'HDFC Bank', price: 1645, change: 1.2, sector: 'Banking' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2410, change: -0.8, sector: 'Energy' },
  { symbol: 'ICICI', name: 'ICICI Bank', price: 985, change: 0.3, sector: 'Banking' },
  { symbol: 'SBIN', name: 'State Bank of India', price: 700, change: 0.9, sector: 'Banking' },
  { symbol: 'WIPRO', name: 'Wipro', price: 520, change: -0.4, sector: 'IT' },
];

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState(['TCS', 'HDFC']);
  const [sectorFilter, setSectorFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');
  const [duration, setDuration] = useState('intraday');
  const [stopLoss, setStopLoss] = useState('');

  const sectors = ['All', ...new Set(dummyStocks.map((s) => s.sector))];

  const handleAddStock = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
      setSearchTerm('');
      alert(`${symbol} added to your Watchlist ✅`);
    } else {
      alert(`${symbol} is already in your Watchlist`);
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter((s) => s !== symbol));
  };

  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
    setBuyModalOpen(true);
  };

  const handleBuyConfirm = () => {
    alert(
      `Bought ${quantity} shares of ${selectedStock.symbol} (${orderType} order, ${duration}), Stop Loss: ₹${stopLoss}`
    );
    setBuyModalOpen(false);
    setQuantity('');
    setLimitPrice('');
    setStopLoss('');
  };

  // Filtered search suggestions
  const filteredStocks = dummyStocks.filter(
    (stock) =>
      (stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !watchlist.includes(stock.symbol) &&
      (sectorFilter === '' || sectorFilter === 'All' || stock.sector === sectorFilter)
  );

  // Display only stocks in watchlist (with optional sector filter)
  const watchedStocks = dummyStocks.filter(
    (stock) =>
      watchlist.includes(stock.symbol) &&
      (sectorFilter === '' || sectorFilter === 'All' || stock.sector === sectorFilter)
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Watchlist
      </Typography>

      {/* Search + Sector Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search Stock"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Sector</InputLabel>
          <Select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            label="Filter by Sector"
          >
            {sectors.map((sector) => (
              <MenuItem key={sector} value={sector === 'All' ? '' : sector}>
                {sector}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Search Results Dropdown */}
      {searchTerm && filteredStocks.length > 0 && (
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 2,
            p: 2,
            mb: 3,
            boxShadow: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Search Results
          </Typography>
          {filteredStocks.map((stock) => (
            <Box
              key={stock.symbol}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Typography>{stock.symbol} — {stock.name}</Typography>
              <IconButton color="primary" onClick={() => handleAddStock(stock.symbol)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Watchlist Table */}
      {watchedStocks.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          You have not added any stocks yet. Use the search bar above to add some.
        </Typography>
      ) : (
        <Table sx={{ borderRadius: 2, boxShadow: 2 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Symbol</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Sector</TableCell>
              <TableCell sx={{ color: 'white' }}>Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Change</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchedStocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.sector}</TableCell>
                <TableCell>₹{stock.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={`${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}%`}
                    color={stock.change > 0 ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => handleBuyClick(stock)}
                  >
                    Buy
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => removeFromWatchlist(stock.symbol)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Buy Modal */}
      <Modal open={buyModalOpen} onClose={() => setBuyModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 450 },
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 10,
            p: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ShoppingCartIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Buy {selectedStock?.symbol}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Current Price: ₹{selectedStock?.price.toFixed(2)} | Change:{' '}
            {selectedStock?.change > 0 ? '+' : ''}
            {selectedStock?.change.toFixed(2)}%
          </Typography>

          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <FormLabel component="legend" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
            Order Type
          </FormLabel>
          <RadioGroup
            row
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <FormControlLabel value="market" control={<Radio />} label="Market" />
            <FormControlLabel value="limit" control={<Radio />} label="Limit" />
          </RadioGroup>

          {orderType === 'limit' && (
            <TextField
              label="Limit Price (₹)"
              type="number"
              fullWidth
              margin="normal"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
            />
          )}

          <FormLabel component="legend" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
            Duration
          </FormLabel>
          <RadioGroup
            row
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <FormControlLabel value="intraday" control={<Radio />} label="Intraday" />
            <FormControlLabel value="long-term" control={<Radio />} label="Long Term" />
          </RadioGroup>

          <TextField
            label="Stop Loss (₹)"
            type="number"
            fullWidth
            margin="normal"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
          />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={() => setBuyModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleBuyConfirm}>
              <TrendingUpIcon sx={{ mr: 1 }} />
              Confirm Buy
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}








