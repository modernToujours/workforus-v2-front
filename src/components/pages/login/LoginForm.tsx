import { Key, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../redux/hooks';
import { login } from '../../../redux/auth/authSlice';

function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(id, password);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_ADDRESS}/login`, {
        id,
        password,
      })
      .then((res) => {
        const token = res.headers['authorization'] as string;
        setCookie('token', token);
        dispatch(login(res.data));
        router.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
      onSubmit={onSubmitHandler}
    >
      <TextField
        value={id}
        onChange={(e) => setId(e.target.value)}
        sx={{ marginTop: 2, width: '300px' }}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginTop: 2 }}
        type={showPassword ? 'text' : 'password'}
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
        로그인
      </Button>
    </Box>
  );
}

export default LoginForm;
