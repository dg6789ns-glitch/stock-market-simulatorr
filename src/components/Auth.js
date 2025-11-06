import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';  // Added for User ID icon
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Light theme for auth
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

export default function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false); // false: Login, true: Sign Up
  const [formData, setFormData] = useState({
    name: '',
    userId: '',  // Changed from email to userId
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input
  };

  // ✅ Safe localStorage parser (reusable)
  const getStoredUsers = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('users'));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  };

  const handleSignUp = () => {
    const { name, userId, password, confirmPassword } = formData;

    if (!name || !userId || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // ✅ Use safe parser
    const users = getStoredUsers();

    if (users.find((u) => u.userId === userId)) {  // Changed to userId
      setError('User ID already exists.');
      return;
    }

    users.push({ name, userId, password });  // Changed to userId
    localStorage.setItem('users', JSON.stringify(users));

    setError('');
    alert('Account created! Please log in.');
    setIsSignUp(false);
  };

  const handleLogin = () => {
    const { userId, password } = formData;  // Changed from email to userId
    if (!userId || !password) {
      setError('User ID and password are required.');
      return;
    }

    //  Use safe parser
    const users = getStoredUsers();

    const user = users.find(
      (u) => u.userId === userId && u.password === password  // Changed to userId
    );

    if (!user) {
      setError('Invalid User ID or password.');
      return;
    }

    setError('');
    onLogin(user); // Pass user data to App
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          p: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: '100%',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            p: 4,
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              mb: 2,
              bgcolor: 'primary.main',
              width: 64,
              height: 64,
            }}
          >
            {isSignUp ? (
              <PersonAddIcon fontSize="large" />
            ) : (
              <LockOutlinedIcon fontSize="large" />
            )}
          </Avatar>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {isSignUp ? 'Create Your Account' : 'Login to Stock Simulator'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {isSignUp && (
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <TextField
            label="User ID"  // Changed from "Email"
            name="userId"  // Changed from "email"
            type="text"  // Changed from "email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.userId}  // Changed from formData.email
            onChange={handleChange}
            InputProps={{
              startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,  // Added icon
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'border-color 0.3s',
                '&:hover fieldset': { borderColor: 'primary.main' },
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />

          {isSignUp && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: 2,
              background:
                'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              '&:hover': {
                background:
                  'linear-gradient(45deg, #FE6B8B 50%, #FF8E53 100%)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
            onClick={isSignUp ? handleSignUp : handleLogin}
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>

          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsSignUp(false)}
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  Login here
                </Link>
              </>
            ) : (
              <>
                New user?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsSignUp(true)}
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'underline',
                  }}
                >
                  Create an account
                </Link>
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

