import { configureStore } from '@reduxjs/toolkit';
import isDrawerOpenReducer from './drawer/isDrawerOpenSlice';

const store = configureStore({
  reducer: {
    isDrawerOpen: isDrawerOpenReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
