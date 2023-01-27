import { Box } from '@mui/material';
import React from 'react';
import ChangeViewButtons from './ChangeViewButtons';
import MonthSelector from './MonthSelector';
import TodayButton from './TodayButton';

const CalendarHeader = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ChangeViewButtons />
      <MonthSelector />
      <TodayButton />
    </Box>
  );
};

export default CalendarHeader;
