'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Button } from '@mui/material';
import LoginButton from '../../components/LoginButton';

const Login: React.FC = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRadius: 3,
        boxShadow: 4,
        p: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 700, color: '#1976d2' }}
        >
          Welcome Back To Ebuddy
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}
        >
          Please sign in to continue
        </Typography>
        <LoginButton />
        <Button
          variant="text"
          onClick={handleRegister}
          sx={{
            mt: 2,
            color: '#1976d2',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        >
          Don’t have an account? Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
