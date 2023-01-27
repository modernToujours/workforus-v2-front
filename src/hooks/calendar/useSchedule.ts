import { useMutation, useQuery } from '@tanstack/react-query';
import { ScheduleType } from '../../lib/types';
import { AxiosError } from 'axios';
import { queryKeys } from '../../react-query/queryKeys';
import {
  deleteSchedule,
  getMySchedules,
  getScheduleById,
  postSchedule,
  updateSchedule,
} from '../../react-query/calendar/schedule/queries';
import queryClient from '../../react-query/queryClient';

export type ScheduleResponseType = {
  schedules: ScheduleType[];
};

export const useMyScheduleList = () => {
  const fallback: ScheduleResponseType = { schedules: [] };

  const { data: mySchedules = fallback, isLoading } = useQuery<
    ScheduleResponseType,
    AxiosError
  >({
    queryKey: [queryKeys.myCalendar, queryKeys.schedule],
    queryFn: () => getMySchedules(),
  });

  return { mySchedules, isLoading };
};

export const useSchedule = (scheduleId: number) => {
  const fallback: ScheduleResponseType = { schedules: [] };
  const { data: schedules = fallback, isLoading } = useQuery<
    ScheduleResponseType,
    AxiosError
  >({
    queryKey: [queryKeys.myCalendar, queryKeys.schedule, scheduleId],
    queryFn: () => getScheduleById(scheduleId),
  });

  return { schedules, isLoading };
};

export const useScheduleAdd = () => {
  return useMutation((schedule: ScheduleType) => postSchedule(schedule), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.myCalendar, queryKeys.schedule]);
    },
  });
};

export const useScheduleUpdate = () => {
  return useMutation((schedule: ScheduleType) => updateSchedule(schedule), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.myCalendar, queryKeys.schedule]);
    },
  });
};

export const useScheduleDelete = () => {
  return useMutation((id: number) => deleteSchedule(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.myCalendar, queryKeys.schedule]);
    },
  });
};
