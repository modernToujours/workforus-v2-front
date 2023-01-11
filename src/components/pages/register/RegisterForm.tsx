import React, { useRef, useState } from 'react';
import { Key, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

function RegisterForm() {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_API_ADDRESS}/register`, {
        id: idRef.current?.value,
        name: nameRef.current?.value,
        password: passwordRef.current?.value,
      })
      .then((res) => {
        if (res) router.push('/login');
        else console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
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
        name="id"
        sx={{ marginTop: 2, width: '300px' }}
        inputRef={idRef}
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
        name="name"
        sx={{ marginTop: 2 }}
        inputRef={nameRef}
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
        name="password"
        inputRef={passwordRef}
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
