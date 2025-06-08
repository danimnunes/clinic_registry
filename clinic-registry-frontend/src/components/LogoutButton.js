import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
      sx={{ mt: 2 }}
    >
      Logout
    </Button>
  );
}
