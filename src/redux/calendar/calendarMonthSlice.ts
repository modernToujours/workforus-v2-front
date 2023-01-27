import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: { value: string } = {
  value:
    new Date().getFullYear().toString() +
    '-' +
    (+new Date().getMonth() + 1).toString(),
};

export const calendarMonthSlice = createSlice({
  name: 'calendarMonth',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setDate } = calendarMonthSlice.actions;

export const selectCalendarMonth = (state: RootState) => state.calendarMonth;

export default calendarMonthSlice.reducer;
