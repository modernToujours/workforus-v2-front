import { Person } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import customAxios from '../../../lib/customAxios';

interface IdFieldProps {
  register: UseFormRegisterReturn<'id'>;
  isLogin: boolean;
}

const IdField: React.FC<IdFieldProps> = ({ register, isLogin }) => {
  const [input, setInput] = useState('');
  const [errorState, setErrorState] = useState({ error: false, errorText: '' });

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const reg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]*$/;
      if (input === '') {
        setErrorState({ error: false, errorText: '' });
      } else if (!reg.test(input)) {
        setErrorState({
          error: true,
          errorText: '영문자 대소문자와 숫자만 입력해주세요.',
        });
      } else if (input.length < 5 || input.length > 10) {
        setErrorState({
          error: true,
          errorText: '5~10글자를 입력해주세요.',
        });
      } else {
        if (!isLogin) {
          customAxios()
            .get(`/register/${input}/exists`)
            .then((res) => {
              if (res.data) {
                setErrorState({
                  error: true,
                  errorText: '중복된 ID 입니다.',
                });
              } else {
                setErrorState({ error: false, errorText: '' });
              }
            });
        } else {
          setErrorState({ error: false, errorText: '' });
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [input, isLogin]);

  return (
    <TextField
      {...register}
      sx={{ marginTop: 2, width: '300px' }}
      label="ID"
      value={input}
      onChange={inputHandler}
      error={errorState.error}
      helperText={errorState.error && errorState.errorText}
      fullWidth
      color="primary"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Person />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default IdField;
