import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EventObject } from '@toast-ui/calendar/types/types/eventBus';
import { RootState } from '../../store';

export type SelectDateTimeInfoState = {
  start: string;
  end: string;
  isAllday: boolean;
};

const initialState: SelectDateTimeInfoState = {
  start: new Date().toString(),
  end: new Date().toString(),
  isAllday: false,
};

export const selectDateTimeInfoSlice = createSlice({
  name: 'selectDateTimeInfo',
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<EventObject>) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
      state.isAllday = action.payload.isAllday;
    },
  },
});

export const { setInfo } = selectDateTimeInfoSlice.actions;

export const selectDateTimeInfo = (state: RootState) =>
  state.selectDateTimeInfo;

export default selectDateTimeInfoSlice.reducer;
