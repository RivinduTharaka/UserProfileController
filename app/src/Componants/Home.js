import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../Componants/Navbar';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Button, Select, MenuItem,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, OutlinedInput, Chip, Checkbox
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
    department: ['HR'],
    businessUnit: ['Operations'],
    status: 'Enable',
  },
  {
    empId: 'E002',
    username: 'janesmith',
    fullname: 'Jane Smith',
    email: 'jane@example.com',
    telephone: '098-765-4321',
    role: 'User',
    department: ['Finance', 'HR'],
    businessUnit: ['Sales'],
    status: 'Disable',
  },
];

const departments = ['HR', 'Finance', 'IT', 'Marketing', 'CHR', 'DFinance', 'MIT', 'AMarketing'];
const businessUnits = ['Operations', 'Sales', 'Support'];

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
    department: [],
    businessUnit: [],
    status: 'Enable',
  });
  const [tempDepartments, setTempDepartments] = useState([]); // Temporary state for departments
  const [deptSelectorOpen, setDeptSelectorOpen] = useState(false); // Controls dropdown open/close state
  const [tempBusinessUnits, setTempBusinessUnits] = useState([]); // Temporary state for business units
  const [businessUnitSelectorOpen, setBusinessUnitSelectorOpen] = useState(false); // Controls dropdown open/close state for business units

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

  // Handle Input Change in Edit Dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name, value) => {
    setUpdatedRow((prev) => ({ ...prev, [name]: value }));
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
    setData((prevData) => [...prevData, { ...newUser, department: tempDepartments, businessUnit: tempBusinessUnits }]);
    setOpenAddDialog(false);
    setNewUser({
      empId: '',
      username: '',
      fullname: '',
      email: '',
      telephone: '',
      role: '',
      department: [],
      businessUnit: [],
      status: 'Enable',
    });
    setTempDepartments([]);
    setTempBusinessUnits([]);
  };

  return (
    <>
      <Navbar />

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar drawerWidth={drawerWidth} />

          <Box sx={{ flex: 1, p: 3, backgroundColor: '#F4F6F8' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4">Users</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddDialog(true)}
              >
                Add User
              </Button>
            </Box>

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

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
              <Table>
                {/* Table Header */}
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell sx={{ maxWidth: 50 }}>No</TableCell>
                    <TableCell sx={{ maxWidth: 10 }}>EmpID</TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>Username</TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>Fullname</TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>Email</TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>Telephone</TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>Role</TableCell>
                    <TableCell sx={{ maxWidth: 130 }}>Department</TableCell>
                    <TableCell sx={{ maxWidth: 130 }}>Business Unit</TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>Status</TableCell>
                    <TableCell sx={{ maxWidth: 100 }}>Update</TableCell>
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                  {filteredData.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ maxWidth: 50 }}>{index + 1}</TableCell>
                      <TableCell sx={{ maxWidth: 50, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.empId}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.username}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.fullname}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.email}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 100 }}>{row.telephone}</TableCell>
                      <TableCell sx={{ maxWidth: 100 }}>{row.role}</TableCell>
                      <TableCell sx={{ maxWidth: 130, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.department.join(' ')}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 130, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.businessUnit.join(' ')}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 100 }}>
                        <Button
                          variant="contained"
                          color={row.status === 'Enable' ? 'success' : 'error'}
                          onClick={() => toggleStatus(row.empId)}
                          size="small"
                        >
                          {row.status}
                        </Button>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 100 }}>
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

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField label="Username" name="username" value={updatedRow.username} onChange={handleInputChange} fullWidth margin="dense" />
          <TextField label="Fullname" name="fullname" value={updatedRow.fullname} onChange={handleInputChange} fullWidth margin="dense" />
          <TextField label="Email" name="email" value={updatedRow.email} onChange={handleInputChange} fullWidth margin="dense" />
          <TextField label="Telephone" name="telephone" value={updatedRow.telephone} onChange={handleInputChange} fullWidth margin="dense" />
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              multiple
              value={updatedRow.department || []}
              onChange={(e) => handleMultiSelectChange('department', e.target.value)}
              input={<OutlinedInput label="Department" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Business Unit</InputLabel>
            <Select
              multiple
              value={updatedRow.businessUnit || []}
              onChange={(e) => handleMultiSelectChange('businessUnit', e.target.value)}
              input={<OutlinedInput label="Business Unit" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {businessUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField label="EmpID" name="empId" value={newUser.empId} onChange={(e) => setNewUser({ ...newUser, empId: e.target.value })} fullWidth margin="dense" />
          <TextField label="Username" name="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} fullWidth margin="dense" />
          <TextField label="Fullname" name="fullname" value={newUser.fullname} onChange={(e) => setNewUser({ ...newUser, fullname: e.target.value })} fullWidth margin="dense" />
          <TextField label="Email" name="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} fullWidth margin="dense" />
          <TextField label="Telephone" name="telephone" value={newUser.telephone} onChange={(e) => setNewUser({ ...newUser, telephone: e.target.value })} fullWidth margin="dense" />
          <TextField label="Role" name="role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} fullWidth margin="dense" />
          <FormControl fullWidth margin="dense">
            <InputLabel>Department</InputLabel>
            <Select
              multiple
              value={tempDepartments}
              onChange={(e) => setTempDepartments(e.target.value)}
              open={deptSelectorOpen}
              onClose={() => setDeptSelectorOpen(false)}
              onOpen={() => setDeptSelectorOpen(true)}
              input={<OutlinedInput label="Department" />}
              // renderValue={(selected) => selected.join(' ')}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  <Checkbox checked={tempDepartments.indexOf(dept) > -1} />
                  {dept}
                </MenuItem>
              ))}
              <MenuItem>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setNewUser((prev) => ({ ...prev, department: tempDepartments }));
                    setDeptSelectorOpen(false);
                  }}
                >
                  Done
                </Button>
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Business Unit</InputLabel>
            <Select
              multiple
              value={tempBusinessUnits}
              onChange={(e) => setTempBusinessUnits(e.target.value)}
              open={businessUnitSelectorOpen}
              onClose={() => setBusinessUnitSelectorOpen(false)}
              onOpen={() => setBusinessUnitSelectorOpen(true)}
              input={<OutlinedInput label="Business Unit" />}
              renderValue={(selected) => selected.join(' ')}
            >
              {businessUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  <Checkbox checked={tempBusinessUnits.indexOf(unit) > -1} />
                  {unit}
                </MenuItem>
              ))}
              <MenuItem>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setNewUser((prev) => ({ ...prev, businessUnit: tempBusinessUnits }));
                    setBusinessUnitSelectorOpen(false);
                  }}
                >
                  Done
                </Button>
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddUser} color="primary" variant="contained">Add User</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
