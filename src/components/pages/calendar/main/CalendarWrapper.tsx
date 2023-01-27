import React, { useRef, useCallback, useEffect, forwardRef } from 'react';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  selectCalendarNavi,
  setDefault,
} from '../../../../redux/calendar/calendarNaviSlice';
import { setDate } from '../../../../redux/calendar/calendarMonthSlice';
import {
  EventObject,
  TZDate,
} from '@toast-ui/calendar/dist/toastui-calendar.min.css';
import Calendar from './Calendar';
import { setModal } from '../../../../redux/calendar/calendarModalSlice';
import { setInfo } from '../../../../redux/calendar/schedule/selectDateTimeInfoSlice';
import { useMyScheduleList } from '../../../../hooks/calendar/useSchedule';
import { useCalendarList } from '../../../../hooks/calendar/useCalendar';
import { selectCalendarVisibility } from '../../../../redux/calendar/calendarVisibilitySlice';
import { useSharingScheduleList } from '../../../../hooks/calendar/useCalendarShare';

const CalendarWithForwardedRef = forwardRef(function CalendarWithForwardRef(
  props,
  ref,
) {
  return <Calendar {...props} forwardRef={ref} />;
});

const CalendarWrapper = () => {
  const dispatch = useAppDispatch();
  const naviAction = useAppSelector(selectCalendarNavi);
  const visibility = useAppSelector(selectCalendarVisibility);
  const calendarRef = useRef(null);
  const { calendars, isLoading: calIsLoading } = useCalendarList();
  const { mySchedules, isLoading: scheduleIsLoading } = useMyScheduleList();
  const { sharingSchedules, isLoading: sharingScheduleIsLoading } =
    useSharingScheduleList();

  const getCalInstance = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => calendarRef.current.getInstance?.(),
    [calendarRef],
  );

  const updateCalendarMonth = useCallback(
    (date: TZDate) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const calMonth = year + '-' + month;
      dispatch(setDate(calMonth));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (calendarRef) {
      const cal = getCalInstance();
      const selectDateTimeFunc = (info: EventObject) => {
        const infoState = {
          start: info.start.toString(),
          end: info.end.toString(),
          isAllday: info.isAllday,
        };
        dispatch(setModal({ modal: 'addSchedule' }));
        dispatch(setInfo(infoState));
        cal.clearGridSelections();
      };
      cal.on('selectDateTime', selectDateTimeFunc);
      cal.on('clickEvent', (event: any) => {
        dispatch(setModal({ modal: 'infoSchedule', detail: event.event.id }));
        console.log(event);
      });
    }
  }, [getCalInstance, calendarRef, dispatch]);

  useEffect(() => {
    if (naviAction.action !== '') {
      const action = naviAction.action as string;
      const calInstance = getCalInstance();
      calInstance[action]();
      dispatch(setDefault());
      updateCalendarMonth(calInstance.getDate());
    }
  }, [dispatch, getCalInstance, naviAction.action, updateCalendarMonth]);

  useEffect(() => {
    const calInstance = getCalInstance();
    if (!calIsLoading) {
      // calInstance.clear();
      calInstance.setCalendars(calendars.calendars);
    }
  }, [calIsLoading, mySchedules, getCalInstance, calendars.calendars]);

  useEffect(() => {
    const calInstance = getCalInstance();
    const { calendarId, isVisible } = visibility;

    calInstance.setCalendarVisibility(calendarId, isVisible);
  }, [getCalInstance, visibility, visibility.calendarId]);

  useEffect(() => {
    const calInstance = getCalInstance();
    if (!scheduleIsLoading && !sharingScheduleIsLoading) {
      calInstance.clear();
      const schedules = mySchedules.schedules
        .concat(sharingSchedules.schedules)
        .map((schedule) => {
          return {
            ...schedule,
            calendarId: schedule.calendarId + '',
            start: schedule.startDate + 'T' + schedule.startTime + ':00',
            end: schedule.endDate + 'T' + schedule.endTime + ':00',
          };
        });
      calInstance.createEvents(schedules);
    }
  }, [
    scheduleIsLoading,
    mySchedules,
    getCalInstance,
    sharingScheduleIsLoading,
    sharingSchedules?.schedules,
  ]);

  return (
    <Box sx={{ flex: 1 }}>
      <CalendarWithForwardedRef ref={calendarRef} />
    </Box>
  );
};

export default CalendarWrapper;
