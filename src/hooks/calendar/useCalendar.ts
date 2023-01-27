import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../react-query/queryKeys';
import {
  postCalendar,
  getCalendars,
  deleteCalendar,
  getCalendar,
  updateCalendar,
} from '../../react-query/calendar/calendar/queries';
import { CalendarType } from '../../lib/types';
import queryClient from '../../react-query/queryClient';
import { AxiosError } from 'axios';

type CalendarResponseType = {
  calendars: CalendarType[];
};

export const useCalendarList = () => {
  const fallback: CalendarResponseType = { calendars: [] };

  const { data: calendars = fallback, isLoading } = useQuery<
    CalendarResponseType,
    AxiosError
  >({
    queryKey: [queryKeys.myCalendar],
    queryFn: () => getCalendars(),
  });

  return { calendars, isLoading };
};

export const useCalendar = (id: number) => {
  const fallback: CalendarType = {
    name: '',
    access: '',
  };

  const { data: calendar = fallback, isLoading } = useQuery<
    CalendarType,
    AxiosError
  >({
    queryKey: [queryKeys.myCalendar, id],
    queryFn: () => getCalendar(id),
  });

  return { calendar, isLoading };
};

export const useCalendarAdd = () => {
  return useMutation((calendar: CalendarType) => postCalendar(calendar), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.myCalendar]);
    },
  });
};

export const useCalendarUpdate = () => {
  return useMutation((calendar: CalendarType) => updateCalendar(calendar), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.myCalendar]);
    },
  });
};

export const useCalendarDelete = () => {
  return useMutation((id: number) => deleteCalendar(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.myCalendar]);
    },
  });
};
