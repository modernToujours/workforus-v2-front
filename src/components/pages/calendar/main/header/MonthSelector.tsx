import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  setNext,
  setPrev,
} from '../../../../../redux/calendar/calendarNaviSlice';
import { selectCalendarMonth } from '../../../../../redux/calendar/calendarMonthSlice';

const MonthSelector = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectCalendarMonth);

  return (
    <Box sx={{ flex: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <IconButton onClick={() => dispatch(setPrev())}>
            <NavigateBefore />
          </IconButton>
        </Box>
        <Box>
          <Button>{date.value}</Button>
        </Box>
        <Box>
          <IconButton onClick={() => dispatch(setNext())}>
            <NavigateNext />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthSelector;
