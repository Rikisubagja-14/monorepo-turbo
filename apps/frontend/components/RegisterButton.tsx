'use client';
import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { registerUser } from '../apis/userApi';
import { useRouter } from "next/navigation";

const RegisterButton: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      await registerUser({ email, password, name, phoneNumber, address }); 
      setSuccess('Registration successful!');
      router.push("/");
    } catch (err: any) {
      setError(err?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        focused
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        focused
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        focused
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        margin="normal"
        focused
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
        focused
      />
      <Button
        variant="contained"
        onClick={handleRegister}
        disabled={loading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="primary" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
    </Box>
  );
};

export default RegisterButton;
