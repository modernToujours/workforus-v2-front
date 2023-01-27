import { Card } from '@mui/material';
import React from 'react';
import CalendarMenuHeader from './CalendarMenuHeader';
import CalendarMenuScheduleAddButton from './CalendarMenuScheduleAddButton';
import MyCalendars from './MyCalendars';
import SharingCalendars from './SharingCalendars';

const CalendarMenuBox = () => {
  return (
    <Card
      sx={{
        width: '200px',
        marginTop: '40px',
        marginLeft: '40px',
        padding: '15px',
        marginBottom: 'auto',
      }}
    >
      <CalendarMenuHeader />
      <CalendarMenuScheduleAddButton />
      <MyCalendars />
      <SharingCalendars />
    </Card>
  );
};

export default CalendarMenuBox;
