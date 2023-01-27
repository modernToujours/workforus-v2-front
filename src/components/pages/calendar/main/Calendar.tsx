import React from 'react';
import TuiCalendar from '@toast-ui/react-calendar';
import { useAppSelector } from '../../../../redux/hooks';
import { selectCalendarView } from '../../../../redux/calendar/calendarViewSlice';

const Calendar = (props: any) => {
  const viewOption = useAppSelector(selectCalendarView);
  return (
    <TuiCalendar
      {...props}
      ref={props.forwardRef}
      timezone={{
        zones: [
          {
            timezoneName: 'Asia/Seoul',
            displayLabel: 'Seoul',
            tooltip: 'UTC+09:00',
          },
        ],
      }}
      height={'800px'}
      day={{
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      }}
      week={{
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      }}
      month={{
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      }}
      usageStatistics={false}
      view={viewOption.type}
    />
  );
};

export default Calendar;
