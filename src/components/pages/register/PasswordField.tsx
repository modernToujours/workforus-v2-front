import { Key, Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, TextField, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PasswordFieldProps {
  register: UseFormRegisterReturn<'password'>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ register }) => {
  const [input, setInput] = useState('');
  const [errorState, setErrorState] = useState({ error: false, errorText: '' });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const reg =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])[a-zA-Z\d`~!@#$%^&*()-_=+]*$/;
      if (input === '') {
        setErrorState({ error: false, errorText: '' });
      } else if (!reg.test(input)) {
        setErrorState({
          error: true,
          errorText:
            '비밀번호는 영문자 대소문자, 숫자, 특수문자("!@#$%^&+=")가 모두 포함되어야합니다.',
        });
      } else {
        setErrorState({ error: false, errorText: '' });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <TextField
      {...register}
      sx={{ marginTop: 2 }}
      type={showPassword ? 'text' : 'password'}
      label="Password"
      fullWidth
      value={input}
      onChange={inputHandler}
      error={errorState.error}
      helperText={errorState.error && errorState.errorText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Key />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
