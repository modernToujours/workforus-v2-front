import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CalendarVisibility {
  calendarId: string;
  isVisible: boolean;
}

const initialState: CalendarVisibility = {
  calendarId: '',
  isVisible: false,
};

export const calendarVisibilitySlice = createSlice({
  name: 'calendarVisiblity',
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<CalendarVisibility>) => {
      state.calendarId = action.payload.calendarId;
      state.isVisible = action.payload.isVisible;
    },
  },
});

export const { setVisibility } = calendarVisibilitySlice.actions;

export const selectCalendarVisibility = (state: RootState) =>
  state.calendarVisibility;

export default calendarVisibilitySlice.reducer;
