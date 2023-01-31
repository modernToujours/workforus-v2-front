import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AlertBarState {
  open?: boolean;
  message: string;
  severity: 'error' | 'info';
}

const initialState: AlertBarState = {
  open: false,
  message: '',
  severity: 'error',
};

export const AlertBarSlice = createSlice({
  name: 'setAlert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertBarState>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    clearAlert: (state) => {
      state.open = false;
      state.message = '';
    },
  },
});

export const { setAlert, clearAlert } = AlertBarSlice.actions;

export const selectAlertBar = (state: RootState) => state.alertbar;

export default AlertBarSlice.reducer;
