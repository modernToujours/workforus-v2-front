import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type NaviActionType = 'prev' | 'today' | 'next' | '';

interface NaviType {
  action: NaviActionType;
}

const initialState: NaviType = { action: '' };

export const calendarNaviSlice = createSlice({
  name: 'calendarView',
  initialState,
  reducers: {
    setToday: (state) => {
      state.action = 'today';
    },
    setNext: (state) => {
      state.action = 'next';
    },
    setPrev: (state) => {
      state.action = 'prev';
    },
    setDefault: (state) => {
      state.action = '';
    },
  },
});

export const { setToday, setNext, setPrev, setDefault } =
  calendarNaviSlice.actions;

export const selectCalendarNavi = (state: RootState) => state.calendarNavi;

export default calendarNaviSlice.reducer;
