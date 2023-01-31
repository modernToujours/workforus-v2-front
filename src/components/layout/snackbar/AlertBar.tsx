import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearAlert, selectAlertBar } from '../../../redux/layout/alertbar';

const AlertBar = () => {
  const alertBar = useAppSelector(selectAlertBar);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearAlert());
  };

  return (
    <Snackbar
      onClose={handleClose}
      open={alertBar.open}
      autoHideDuration={6000}
    >
      <Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={alertBar.severity}
        sx={{ width: '100%' }}
      >
        {alertBar.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
