import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useAppDispatch } from '../../redux/hooks';
import { login, logout } from '../../redux/auth/authSlice';
import customAxios from '../../lib/customAxios';

type AuthProvierProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProvierProps) {
  const dispatch = useAppDispatch();
  const token = getCookie('token');

  useEffect(() => {
    if (token) {
      customAxios()
        .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth`)
        .then((res) => {
          dispatch(
            login({
              id: res.data.id,
              name: res.data.name,
              roles: res.data.roles,
            }),
          );
        })
        .catch(() => {
          dispatch(logout);
        });
    } else {
      dispatch(logout);
    }
  }, [dispatch, token]);

  return <>{children}</>;
}

export default AuthProvider;
