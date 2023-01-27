import { useMutation, useQuery } from '@tanstack/react-query';
import { CalendarShareType } from '../../lib/types';
import { AxiosError } from 'axios';
import { queryKeys } from '../../react-query/queryKeys';
import {
  getCalendarShare,
  getSharingSchedules,
  postCalendarShare,
} from '../../react-query/calendar/share/queries';
import queryClient from '../../react-query/queryClient';
import { ScheduleResponseType } from './useSchedule';

type CalendarShareResponseType = {
  calendarShares: CalendarShareType[];
};

export const useSharingCalendarList = () => {
  const fallback: CalendarShareResponseType = {
    calendarShares: [],
  };

  const { data: calendarShares = fallback, isLoading } = useQuery<
    CalendarShareResponseType,
    AxiosError
  >({
    queryKey: [queryKeys.sharingCalendar],
    queryFn: () => getCalendarShare(),
  });

  return { calendarShares, isLoading };
};

export const useSharingScheduleList = () => {
  const fallback: ScheduleResponseType = { schedules: [] };
  const { data: sharingSchedules = fallback, isLoading } = useQuery<
    ScheduleResponseType,
    AxiosError
  >({
    queryKey: [queryKeys.sharingCalendar, queryKeys.schedule],
    queryFn: () => getSharingSchedules(),
  });

  return { sharingSchedules, isLoading };
};

export const useCalendarShareAdd = () => {
  return useMutation((calendarId: number) => postCalendarShare(calendarId), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.sharingCalendar]);
    },
  });
};
