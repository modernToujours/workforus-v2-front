import { Box, Button } from '@mui/material';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../redux/hooks';
import { login } from '../../../redux/auth/authSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import IdField from '../register/IdField';
import PasswordField from '../register/PasswordField';
import { clearAlert, setAlert } from '../../../redux/layout/alertbar';

interface LoginInput {
  id: string;
  password: string;
}

function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(clearAlert());
    handleSubmit(onSubmit)().catch((error) => {
      handleError();
      console.log(error);
    });
  };

  const handleError = () => {
    console.log(errors);
    if (errors.id) {
      setErrorMessage('ID 입력란을 다시 확인해주세요!');
    } else if (errors.password) {
      setErrorMessage('패스워드 입력란을 다시 확인해주세요!');
    } else {
      setErrorMessage('');
    }
    errorMessage &&
      dispatch(
        setAlert({
          message: errorMessage,
          severity: 'error',
        }),
      );
  };

  const onSubmit: SubmitHandler<LoginInput> = ({ id, password }) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_ADDRESS}/login`, {
        id: id,
        password: password,
      })
      .then((res) => {
        const token = res.headers['authorization'] as string;
        setCookie('token', token);
        dispatch(login(res.data));
        dispatch(
          setAlert({
            message: '로그인에 성공하셨습니다!!',
            severity: 'info',
          }),
        );
        if (res) router.push('/login');
        else console.log(res);
      })
      .catch(() => {
        dispatch(
          setAlert({
            message: '로그인에 실패하셨습니다!!',
            severity: 'error',
          }),
        );
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
      <IdField
        register={register('id', {
          required: true,
          minLength: 5,
          maxLength: 10,
          pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]*$/,
        })}
        isLogin={true}
      />
      <PasswordField
        register={register('password', {
          required: true,
          minLength: 8,
          maxLength: 15,
          pattern:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])[a-zA-Z\d`~!@#$%^&*()-_=+]*$/,
        })}
      />
      <Button variant="outlined" sx={{ marginTop: 3 }} type="submit">
        로그인
      </Button>
    </Box>
  );
}

export default LoginForm;
