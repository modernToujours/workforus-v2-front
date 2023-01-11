import { configureStore } from '@reduxjs/toolkit';
import isDrawerOpenReducer from './drawer/isDrawerOpenSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    isDrawerOpen: isDrawerOpenReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
