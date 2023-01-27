import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type ScheduleInfoStateType = {
  calendarId: number;
  title: string;
  body: string;
};

const initialState: ScheduleInfoStateType = {
  calendarId: 0,
  title: '',
  body: '',
};

export const scheduleInfoSlice = createSlice({
  name: 'selectScheduleInfo',
  initialState,
  reducers: {
    setScheduleInfo: (state, action: PayloadAction<ScheduleInfoStateType>) => {
      state.calendarId = action.payload.calendarId;
      state.title = action.payload.title;
      state.body = action.payload.body;
    },
    resetScheduleInfo: (state) => {
      state.calendarId = 0;
      state.title = '';
      state.body = '';
    },
  },
});

export const { setScheduleInfo, resetScheduleInfo } = scheduleInfoSlice.actions;

export const selectScheduleInfo = (state: RootState) => state.scheduleInfo;

export default scheduleInfoSlice.reducer;
