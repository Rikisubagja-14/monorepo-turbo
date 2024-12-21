'use client';

import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import RegisterButton from '../../components/RegisterButton';

const Register: React.FC = () => {
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
          Create Your Account
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}
        >
          Please fill in the details to register
        </Typography>
        <RegisterButton />
      </Box>
    </Container>
  );
};

export default Register;
