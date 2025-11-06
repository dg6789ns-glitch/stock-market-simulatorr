import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Avatar,
  TextField,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // NEW ICON
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StockChart from './StockChart';

// Sidebar width (same as in your sidebar)
const drawerWidth = 240;

export default function Dashboard({ sidebarOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === 'dark';
  const [chartModalOpen, setChartModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const [stockList, setStockList] = useState([
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3560, change: 0.5 },
    { symbol: 'INFY', name: 'Infosys', price: 1523, change: -0.2 },
    { symbol: 'HDFC', name: 'HDFC Bank', price: 1645, change: 1.2 },
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2410, change: -0.8 },
    { symbol: 'ICICI', name: 'ICICI Bank', price: 985, change: 0.3 },
  ]);

  const [newStock, setNewStock] = useState('');

  const handleViewChart = (stock) => {
    setSelectedStock(stock);
    setChartModalOpen(true);
  };

  const handleAddStock = () => {
    if (!newStock.trim()) return;

    const symbol = newStock.toUpperCase();
    const exists = stockList.some((s) => s.symbol === symbol);
    if (exists) {
      alert('Stock already exists in the table!');
      return;
    }

    // Dummy generated data for added stock
    const newEntry = {
      symbol,
      name: `${symbol} Company`,
      price: Math.floor(Math.random() * 2000) + 500,
      change: parseFloat((Math.random() * 2 - 1).toFixed(2)), // random + or - change
    };

    setStockList((prev) => [...prev, newEntry]);
    setNewStock('');
  };

  const portfolioSummary = { balance: 95000, totalValue: 105000, pl: 5000 };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '100vh',
        transition: 'margin 0.3s ease-in-out',
        ml: sidebarOpen ? `${drawerWidth}px` : 0,
        overflowX: 'hidden',
        background: isDarkMode ? '#121212' : '#fafafa',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          width: '100%',
        }}
      >
        <Grid container spacing={3} alignItems="flex-start">
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={3} lg={3}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
            >
              Dashboard Overview
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Cash Balance */}
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccountBalanceIcon sx={{ mr: 1 }} />
                    <Typography>Cash Balance</Typography>
                  </Box>
                  <Typography variant="h5">₹{portfolioSummary.balance}</Typography>
                </CardContent>
              </Card>

              {/* Portfolio Value */}
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    <Typography>Total Portfolio Value</Typography>
                  </Box>
                  <Typography variant="h5">₹{portfolioSummary.totalValue}</Typography>
                </CardContent>
              </Card>

              {/* P/L Today */}
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrendingDownIcon sx={{ mr: 1 }} />
                    <Typography>P/L Today</Typography>
                  </Box>
                  <Chip
                    label={`₹${portfolioSummary.pl > 0 ? '+' : ''}${portfolioSummary.pl}`}
                    color={portfolioSummary.pl > 0 ? 'success' : 'error'}
                    sx={{ fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.2)' }}
                  />
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* CENTER COLUMN */}
          <Grid item xs={12} md={6} lg={6}>
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', fontWeight: 'bold', color: 'primary.main', mb: 2 }}
            >
              Market Overview
            </Typography>

            {/* Search and Add Stock */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                mb: 2,
                justifyContent: 'center',
              }}
            >
              <TextField
                size="small"
                label="Search or Add Stock"
                variant="outlined"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                sx={{ width: '70%' }}
              />
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddStock}
              >
                Add
              </Button>
            </Box>

            {/* Stock Table */}
            <Box sx={{ overflowX: 'auto' }}>
              <Table
                sx={{
                  background: isDarkMode ? '#1e1e1e' : '#fff',
                  borderRadius: 3,
                  boxShadow: 3,
                  minWidth: '100%',
                }}
              >
                <TableHead>
                  <TableRow sx={{ background: theme.palette.primary.main }}>
                    {['Symbol', 'Name', 'Price', 'Change', 'Actions'].map((h) => (
                      <TableCell key={h} sx={{ color: 'white', fontWeight: 'bold' }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockList.map((stock) => (
                    <TableRow
                      key={stock.symbol}
                      sx={{
                        '&:hover': {
                          background: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                          transition: '0.3s',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 'bold' }}>{stock.symbol}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell>₹{stock.price}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${stock.change > 0 ? '+' : ''}${stock.change}%`}
                          color={stock.change > 0 ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleViewChart(stock)}
                        >
                          <BarChartIcon sx={{ mr: 1 }} /> View Chart
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={3} lg={3}>
            {/* Recent Transactions Shortcut */}
            <Card
              onClick={() => navigate('/transactions')}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: 'center',
                p: 4,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 70,
                  height: 70,
                  margin: '0 auto 10px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.15)',
                  },
                }}
              >
                <ReceiptLongIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Recent Transactions
              </Typography>
            </Card>

            {/* Watchlist Shortcut */}
            <Card
              onClick={() => navigate('/watchlist')}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                textAlign: 'center',
                p: 4,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  width: 70,
                  height: 70,
                  margin: '0 auto 10px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.15)',
                  },
                }}
              >
                <ShowChartIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                Watchlist
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Chart Modal */}
        <Modal open={chartModalOpen} onClose={() => setChartModalOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: '80%', md: '70%' },
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: 3,
              boxShadow: 10,
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <ShowChartIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6">Chart for {selectedStock?.symbol}</Typography>
            </Box>
            {selectedStock && <StockChart />}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="outlined" onClick={() => setChartModalOpen(false)}>
                Close Chart
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}





