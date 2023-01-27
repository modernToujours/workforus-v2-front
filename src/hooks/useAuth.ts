import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/auth/authSlice';

export const useAuth = () => {
  const { id, name, roles, isLogin } = useAppSelector(selectAuth);

  return { id, name, roles, isLogin };
};
