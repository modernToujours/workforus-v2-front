import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ViewType = 'month' | 'week' | 'day';

interface ViewStateType {
  type: ViewType;
}

const initialState: ViewStateType = { type: 'month' };

export const calendarViewSlice = createSlice({
  name: 'calendarView',
  initialState,
  reducers: {
    setMonth: (state) => {
      state.type = 'month';
    },
    setWeek: (state) => {
      state.type = 'week';
    },
    setDay: (state) => {
      state.type = 'day';
    },
  },
});

export const { setMonth, setWeek, setDay } = calendarViewSlice.actions;

export const selectCalendarView = (state: RootState) => state.calendarView;
export default calendarViewSlice.reducer;
