import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import IdField from './IdField';
import NameField from './NameField';
import PasswordField from './PasswordField';
import { useAppDispatch } from '../../../redux/hooks';
import { clearAlert, setAlert } from '../../../redux/layout/alertbar';

interface RegisterInput {
  id: string;
  name: string;
  password: string;
}

function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(clearAlert());
    handleSubmit(onSubmit)().catch((error) => {
      handleError();
      console.log(error);
    });
  };

  const onSubmit: SubmitHandler<RegisterInput> = ({ id, name, password }) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_ADDRESS}/register`, {
        id: id,
        name: name,
        password: password,
      })
      .then((res) => {
        dispatch(
          setAlert({
            message: '회원가입에 성공하셨습니다!!',
            severity: 'info',
          }),
        );
        if (res) router.push('/login');
        else console.log(res);
      })
      .catch(() => {
        setAlert({
          message: '회원가입에 실패하셨습니다!!',
          severity: 'error',
        });
      });
  };

  const handleError = () => {
    console.log(errors);
    if (errors.id) {
      setErrorMessage('ID 입력란을 다시 확인해주세요!');
    } else if (errors.name) {
      setErrorMessage('이름 입력란을 다시 확인해주세요!');
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
          pattern: /^[a-zA-Z0-9]*$/,
        })}
        isLogin={false}
      />
      <NameField
        register={register('name', {
          required: true,
          minLength: 2,
          maxLength: 6,
          pattern: /^[가-힣]*$/,
        })}
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
        회원가입
      </Button>
    </Box>
  );
}

export default RegisterForm;
