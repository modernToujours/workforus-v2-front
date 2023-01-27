import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { setModal } from '../../../../redux/calendar/calendarModalSlice';

const CalendarMenuScheduleAddButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
      <Button
        variant="contained"
        sx={{ width: '80%' }}
        onClick={() => dispatch(setModal({ modal: 'addSchedule' }))}
      >
        <Typography fontSize={20}>일정추가</Typography>
      </Button>
    </Box>
  );
};

export default CalendarMenuScheduleAddButton;
