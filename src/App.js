import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';

import VisibilityIcon from '@mui/icons-material/Visibility';  // For Watchlist

import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Transactions from './components/Transactions';

import Watchlist from './components/Watchlist';

// MUI Themes with Custom Dark Mode
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },  // Brighter blue for dark mode
    secondary: { main: '#f48fb1' },  // Brighter pink
    background: {
      default: '#121212',  // Deeper black
      paper: '#1e1e1e',  // Dark gray for cards
    },
    text: {
      primary: '#ffffff',  // White text
      secondary: '#b0b0b0',  // Light gray for secondary text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)',  // Gradient hover for buttons
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          background: 'linear-gradient(145deg, #1e1e1e 0%, #2a2a2a 100%)',  // Subtle gradient for cards
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1e1e1e 0%, #2a2a2a 100%)',
        },
      },
    },
  },
});

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  if (!isLoggedIn) {
    return <Auth onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>Stock Simulator</Typography>
              <IconButton onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{
              '& .MuiDrawer-paper': {
                bgcolor: 'background.paper',
                color: 'text.primary',
                background: darkMode
                  ? 'linear-gradient(180deg, #1e1e1e 0%, #2a2a2a 100%)'  // Dark gradient
                  : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',  // Light gradient
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                borderRight: '1px solid rgba(255,255,255,0.1)',
              },
            }}
          >
            <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Stock Simulator
              </Typography>
            </Box>
            <List sx={{ width: 250, pt: 1 }}>
              <ListItem button component={Link} to="/" onClick={toggleDrawer} sx={{ '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' } }}>
                <DashboardIcon sx={{ mr: 2 }} />
                <ListItemText primary="Dashboard" sx={{ color: 'text.primary' }} />
              </ListItem>
              <ListItem button component={Link} to="/portfolio" onClick={toggleDrawer} sx={{ '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' } }}>
                <AccountBalanceIcon sx={{ mr: 2 }} />
                <ListItemText primary="Portfolio" sx={{ color: 'text.primary' }} />
              </ListItem>
              <ListItem button component={Link} to="/transactions" onClick={toggleDrawer} sx={{ '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' } }}>
                <ReceiptIcon sx={{ mr: 2 }} />
                <ListItemText primary="Transactions" sx={{ color: 'text.primary' }} />
              </ListItem>
              
              <ListItem button component={Link} to="/watchlist" onClick={toggleDrawer} sx={{ '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' } }}>
                <VisibilityIcon sx={{ mr: 2 }} />
                <ListItemText primary="Watchlist" sx={{ color: 'text.primary' }} />
              </ListItem>
             
              <Divider sx={{ my: 1 }} />
              <ListItem button onClick={() => setIsLoggedIn(false)} sx={{ '&:hover': { bgcolor: 'error.light', color: 'error.contrastText' } }}>
                <LogoutIcon sx={{ mr: 2 }} />
                <ListItemText primary="Logout" sx={{ color: 'text.primary' }} />
              </ListItem>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/transactions" element={<Transactions />} />
              
              <Route path="/watchlist" element={<Watchlist />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

