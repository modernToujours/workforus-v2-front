import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserType } from '../../lib/types';

interface AuthState {
  id: string | undefined;
  name: string | undefined;
  roles: string[];
  isLogin: boolean;
}

const initialState: AuthState = {
  id: undefined,
  name: undefined,
  roles: ['GUEST'],
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.roles = [];
      action.payload.roles?.forEach((role) => {
        state.roles.push(role.name);
      });
      state.isLogin = true;
    },
    logout: (state) => {
      state.id = undefined;
      state.name = undefined;
      state.roles = ['guest'];
      state.isLogin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
