import React, { useState } from 'react';
import { Key, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '300px',
        margin: '0 auto',
      }}
    >
      <TextField
        id="login-id"
        sx={{ marginTop: 2, width: '300px' }}
        label="ID"
        fullWidth
        required
        color="primary"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{ marginTop: 2 }}
        type="text"
        label="Name"
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Key />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{ marginTop: 2 }}
        type={showPassword ? 'text' : 'password'}
        label="Password"
        fullWidth
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Key />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="outlined" sx={{ marginTop: 3 }} type="submit">
        회원가입
      </Button>
    </Box>
  );
}

export default RegisterForm;
