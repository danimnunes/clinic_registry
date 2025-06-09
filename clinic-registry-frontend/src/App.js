import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Register from './pages/Register';
import { isTokenExpired, getUserRoles, logout } from './utils/auth';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function RequireAuthAndRole({ roles, children }) {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired()) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  const userRoles = getUserRoles();
  const hasRole = roles.some(role => userRoles.includes(role));
  if (!hasRole) return <Navigate to="/unauthorized" />;

  return children;
}

function UnauthorizedPage() {
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" color="error" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" gutterBottom>
        You do not have the necessary permissions to view this page.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Switch Account
        </Button>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuthAndRole roles={['ROLE_DOCTOR', 'ROLE_ADMIN']}>
                <Dashboard />
              </RequireAuthAndRole>
            }
          />
          <Route
            path="/statistics"
            element={
              <RequireAuthAndRole roles={['ROLE_DOCTOR', 'ROLE_ADMIN']}>
                <Statistics />
              </RequireAuthAndRole>
            }
          />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
