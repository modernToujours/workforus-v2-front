import { Box, Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../../../../redux/hooks';
import { setToday } from '../../../../../redux/calendar/calendarNaviSlice';

const TodayButton = () => {
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ flex: 1 }}>
      <Button onClick={() => dispatch(setToday())}>오늘</Button>
    </Box>
  );
};

export default TodayButton;
