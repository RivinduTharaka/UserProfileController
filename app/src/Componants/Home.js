import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../Componants/Navbar';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button, Select, MenuItem,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const initialUserData = [
  {
    empId: 'E001',
    username: 'johndoe',
    fullname: 'John Doe',
    email: 'john@example.com',
    telephone: '123-456-7890',
    role: 'Admin',
    status: 'Enable',
  },
  {
    empId: 'E002',
    username: 'janesmith',
    fullname: 'Jane Smith',
    email: 'jane@example.com',
    telephone: '098-765-4321',
    role: 'User',
    status: 'Disable',
  },
];

function Home() {
  const drawerWidth = 240;

  // State
  const [data, setData] = useState(initialUserData);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [updatedRow, setUpdatedRow] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    empId: '',
    username: '',
    fullname: '',
    email: '',
    telephone: '',
    role: '',
    status: 'Enable',
  });

  // Search filter
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Status Toggle
  const toggleStatus = (empId) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.empId === empId
          ? { ...row, status: row.status === 'Enable' ? 'Disable' : 'Enable' }
          : row
      )
    );
  };

  // Handle Open Edit Dialog
  const handleOpenEdit = (row) => {
    setEditRow(row);
    setUpdatedRow(row);
    setOpenEditDialog(true);
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    setData((prevData) =>
      prevData.map((row) => (row.empId === updatedRow.empId ? updatedRow : row))
    );
    setOpenEditDialog(false);
  };

  // Handle Add New User
  const handleAddUser = () => {
    setData((prevData) => [...prevData, newUser]);
    setOpenAddDialog(false);
    setNewUser({
      empId: '',
      username: '',
      fullname: '',
      email: '',
      telephone: '',
      role: '',
      status: 'Enable',
    });
  };

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <Sidebar drawerWidth={drawerWidth} />

          {/* Main Content */}
          <Box sx={{ flex: 1, p: 3, backgroundColor: '#F4F6F8' }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4">Users</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddDialog(true)} // Open Add Dialog
              >
                Add User
              </Button>
            </Box>

            {/* Filter Section */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <TextField
                label="Search Username or Fullname"
                variant="outlined"
                size="small"
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
                sx={{ width: '300px' }}
              />
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell>No</TableCell>
                    <TableCell>EmpID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Fullname</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Telephone</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.empId}</TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.fullname}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.telephone}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color={row.status === 'Enable' ? 'success' : 'error'}
                          onClick={() => toggleStatus(row.empId)}
                          size="small"
                        >
                          {row.status}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpenEdit(row)}
                          size="small"
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      {/* Add User Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="EmpID"
            name="empId"
            value={newUser.empId}
            onChange={(e) => setNewUser({ ...newUser, empId: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Username"
            name="username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Fullname"
            name="fullname"
            value={newUser.fullname}
            onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Telephone"
            name="telephone"
            value={newUser.telephone}
            onChange={(e) => setNewUser({ ...newUser, telephone: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Role"
            name="role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary" variant="contained">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
