import { Key } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface NameFieldProps {
  register: UseFormRegisterReturn<'name'>;
}

const NameField: React.FC<NameFieldProps> = ({ register }) => {
  const [input, setInput] = useState('');
  const [errorState, setErrorState] = useState({ error: false, errorText: '' });

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const reg = /^[가-힣]*$/;
      if (input === '') {
        setErrorState({ error: false, errorText: '' });
      } else if (!reg.test(input)) {
        setErrorState({
          error: true,
          errorText: '한글만 입력해주세요.',
        });
      } else if (input.length < 2 || input.length > 6) {
        setErrorState({
          error: true,
          errorText: '2~6글자를 입력해주세요.',
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
      type="text"
      label="Name"
      value={input}
      onChange={inputHandler}
      error={errorState.error}
      helperText={errorState.error && errorState.errorText}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Key />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default NameField;
