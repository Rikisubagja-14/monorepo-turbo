'use client';

import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { loginUser } from '../apis/userApi';
import { useRouter } from "next/navigation";
import { isLoggedIn } from '../utils/isLogin';

const LoginButton: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, [router]);
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await loginUser({ email, password });
      if (response?.data?.token) {
        localStorage.setItem('authToken', response.data.token);
        setSuccess('Login successful!');
        router.push("/home");
      } else {
        setError('Failed to login. Please check your credentials.');
      }
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="dense"
        autoComplete="off" 
        focused
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="dense"
        autoComplete="off" 
        focused
      />
      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
    </Box>
  );
};

export default LoginButton;
