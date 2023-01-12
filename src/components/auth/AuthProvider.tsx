import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { getCookie } from 'cookies-next';
import { decrypt } from '../../lib/encrypt';
import { useAppDispatch } from '../../redux/hooks';
import { login, logout } from '../../redux/auth/authSlice';

type AuthProvierProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProvierProps) {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState('');

  useEffect(() => {
    const encryptedToken = getCookie('token');
    if (encryptedToken) {
      const jwtToken = decrypt(encryptedToken?.toString());
      setToken(jwtToken);
      axios.defaults.headers.common['Authorization'] = token;
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/auth`)
        .then((res) => {
          dispatch(
            login({
              id: res.data.id,
              name: res.data.name,
              role: res.data.roles,
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
