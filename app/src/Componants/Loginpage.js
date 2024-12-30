import React, { useState } from 'react';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Custom styling for the Paper component
const StyledPaper = styled(Paper)({
  padding: '40px 20px',
  width: 350,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white', // Pure white card background
  borderRadius: '16px', // Rounded corners
  border: '1px solid rgba(0, 0, 0, 0.1)', // Subtle black border
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
});



const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);
    // Implement login logic here
  };

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff', // Solid white background
      }}
    >
      <StyledPaper elevation={10}>
        <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold', mb: 2 }}>
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email ID"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            InputProps={{
              sx: {
                color: 'black',
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
            }}
            InputLabelProps={{
              style: { color: 'black' },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              sx: {
                color: 'black',
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
            }}
            InputLabelProps={{
              style: { color: 'black' },
            }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: 'black' }} />}
            label="Remember me"
            sx={{ color: 'black', mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 2,
              mb: 2,
              bgcolor: 'black',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
              borderRadius: '8px',
            }}
          >
            Login
          </Button>
          {/* <Link
            href="#"
            variant="body2"
            sx={{
              color: 'black',
              display: 'block',
              textAlign: 'center',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Forgot password?
          </Link> */}
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default Loginpage;
