import { Box, Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../../../redux/hooks';
import {
  setMonth,
  setWeek,
  setDay,
} from '../../../../../redux/calendar/calendarViewSlice';

const ChangeViewButtons = () => {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flex: 1, display: 'flex' }}>
      <Button onClick={() => dispatch(setDay())}>일간</Button>
      <Button onClick={() => dispatch(setWeek())}>주간</Button>
      <Button onClick={() => dispatch(setMonth())}>월간</Button>
    </Box>
  );
};

export default ChangeViewButtons;
