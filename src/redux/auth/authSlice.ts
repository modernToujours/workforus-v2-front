import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserType } from '../../lib/types';

interface AuthState {
  id: string | undefined;
  name: string | undefined;
  roles: string[];
  isLogin: boolean;
  isLoading?: boolean;
}

const initialState: AuthState = {
  id: undefined,
  name: undefined,
  roles: ['GUEST'],
  isLogin: false,
  isLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    login: (state, action: PayloadAction<UserType>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.roles = [];
      action.payload.roles?.forEach((role) => {
        state.roles.push(role.name);
      });
      state.isLogin = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.id = undefined;
      state.name = undefined;
      state.roles = ['guest'];
      state.isLogin = false;
      state.isLoading = false;
    },
  },
});

export const { login, logout, loading } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
