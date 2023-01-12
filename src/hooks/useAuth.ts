import axios from 'axios';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/auth/authSlice';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_ADDRESS}`;

export const useAuth = () => {
  const { id, name, roles, isLogin } = useAppSelector(selectAuth);

  return { id, name, roles, isLogin };
};
