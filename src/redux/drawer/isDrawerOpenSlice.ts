import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IsDrawerOpenState {
  value: boolean;
}

const initialState: IsDrawerOpenState = {
  value: false,
};

export const isDrawerOpenSlice = createSlice({
  name: 'isDrawerOpen',
  initialState,
  reducers: {
    open: (state) => {
      state.value = true;
    },
    close: (state) => {
      state.value = false;
    },
  },
});

export const { open, close } = isDrawerOpenSlice.actions;

export const selectIsDrawerOpen = (state: RootState) =>
  state.isDrawerOpen.value;

export default isDrawerOpenSlice.reducer;
