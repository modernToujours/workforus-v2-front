import { EventAvailable } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const CalendarMenuHeader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <EventAvailable fontSize="large" />
      <Box>
        <Typography fontSize={24} sx={{ marginLeft: '3px' }}>
          캘린더
        </Typography>
      </Box>
    </Box>
  );
};

export default CalendarMenuHeader;
