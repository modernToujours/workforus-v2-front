import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ModalStateValueType =
  | ''
  | 'addSchedule'
  | 'infoSchedule'
  | 'addCalendar'
  | 'addShareCalendar'
  | 'infoCalendar'
  | 'infoShareCalendar';

type ModalStateType = {
  modal: ModalStateValueType;
  detail?: number | null;
};

const initialState: ModalStateType = {
  modal: '',
  detail: null,
};

export const calendarModalSlice = createSlice({
  name: 'calendarModal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalStateType>) => {
      state.modal = action.payload.modal;
      if (action.payload.detail) state.detail = action.payload.detail;
      else state.detail = null;
    },
  },
});

export const { setModal } = calendarModalSlice.actions;

export const selectCalendarModal = (state: RootState) => state.calendarModal;

export default calendarModalSlice.reducer;
