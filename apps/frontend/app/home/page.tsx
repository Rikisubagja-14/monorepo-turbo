'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CssBaseline
} from '@mui/material';
import { getUserById, updateUser, getUser, DeleteUser } from '../../apis/userApi';
import { isLoggedIn } from '../../utils/isLogin';

const Home: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedIn = await isLoggedIn();
      if (!loggedIn && !localStorage.getItem('authToken')) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, [router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUser();
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUpdateClick = async (userId: string) => {
    try {
      const response = await getUserById(userId);
      setSelectedUser(response.data);
      setOpenDialog(true);
    } catch (err) {
      setError('Failed to fetch user data');
    }
  };

  const handleDeleteClick = (userId: string) => {
    setSelectedUser(userId);
    setOpenDeleteDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleConfirmUpdate = async () => {
    if (selectedUser) {
      try {
        await updateUser(selectedUser.uid, selectedUser);
        setOpenDialog(false);
        setSelectedUser(null);
        const response = await getUser();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to update user');
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await DeleteUser(selectedUser);
        setOpenDeleteDialog(false);
        setSelectedUser(null);
        const response = await getUser();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser: any) => ({ ...prevUser, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const filteredUsers = users.filter((user: any) => {
    const userName = user.name ? user.name.toLowerCase() : '';
    const userEmail = user.email ? user.email.toLowerCase() : '';
    const userPhone = user.phoneNumber ? user.phoneNumber : '';

    return (
      userName.includes(searchTerm.toLowerCase()) ||
      userEmail.includes(searchTerm.toLowerCase()) ||
      userPhone.includes(searchTerm)
    );
  });


  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" align="center" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <CssBaseline />

      <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
              User Management EBUDDY
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
              Manage your users with ease
            </Typography>
          </Box>

          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 10, // Rounded corners
                '& fieldset': {
                  borderColor: '#2196f3',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
            value={searchTerm}
            onChange={handleSearch}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              mb: 3,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Logout
          </Button>

          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                    UID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2196f3' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2196f3' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2196f3' }}>Phone Number</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user: any) => (
                  <TableRow key={user.uid}>
                    <TableCell align="center">{user.uid}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateClick(user.uid)}
                        sx={{
                          mr: 1,
                          borderRadius: 2,
                          backgroundColor: '#4caf50',
                          '&:hover': {
                            backgroundColor: '#388e3c',
                          },
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(user.uid)}
                        sx={{
                          borderRadius: 2,
                          backgroundColor: '#f44336',
                          '&:hover': {
                            backgroundColor: '#d32f2f',
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: 'text.secondary' }}>
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Update Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title" sx={{ color: '#1976d2' }}>
              Update User
            </DialogTitle>
            <DialogContent>
              {selectedUser && (
                <>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={selectedUser.name}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={selectedUser.email}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense"
                    name="phoneNumber"
                    label="Phone Number"
                    type="text"
                    fullWidth
                    value={selectedUser.phoneNumber}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmUpdate} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            aria-labelledby="delete-dialog-title"
          >
            <DialogTitle id="delete-dialog-title" sx={{ color: '#f44336' }}>
              Confirm Deletion
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete this user?
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <footer style={{ backgroundColor: '#2196f3', color: '#fff', padding: '10px 0' }}>
          <Container maxWidth="lg">
            <Typography variant="body2" align="center">
              © 2024 Riki subagja || Riki43733@gmail.com . All rights reserved.
            </Typography>
          </Container>
        </footer>
      </Container>
    </>
  );
};

export default Home;
