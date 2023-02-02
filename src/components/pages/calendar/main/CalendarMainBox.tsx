import React from 'react';
import { Card } from '@mui/material';
import CalendarHeader from './header/CalendarHeader';
import dynamic from 'next/dynamic';
import { selectCalendarModal } from '../../../../redux/calendar/calendarModalSlice';
import { useAppSelector } from '../../../../redux/hooks';
import AddScheduleModal from '../modal/schedule/AddScheduleModal';
import AddCalendarModal from '../modal/calendar/AddCalendarModal';
import CalendarInfoModal from '../modal/calendar/CalendarInfoModal';
import ScheduleInfoModal from '../modal/schedule/ScheduleInfoModal';
import AddSharingCalendarModal from '../modal/calendar/AddSharingCalendarModal';
import SharingCalendarInfoModal from '../modal/calendar/SharingCalendarInfoModal';

const CalendarWrapper = dynamic(import('./CalendarWrapper'), { ssr: false });

const CalendarMainBox = () => {
  const modal = useAppSelector(selectCalendarModal);

  const renderModal = () => {
    switch (modal.modal) {
      case 'addSchedule':
        return <AddScheduleModal />;
      case 'addCalendar':
        return <AddCalendarModal />;
      case 'infoCalendar':
        return <CalendarInfoModal />;
      case 'infoSchedule':
        return <ScheduleInfoModal />;
      case 'addShareCalendar':
        return <AddSharingCalendarModal />;
      case 'infoShareCalendar':
        return <SharingCalendarInfoModal />;
      default:
        return;
    }
  };

  return (
    <Card
      sx={{ margin: '40px', flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      <CalendarHeader />
      <CalendarWrapper />
      {renderModal()}
    </Card>
  );
};

export default CalendarMainBox;
