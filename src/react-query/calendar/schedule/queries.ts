import customAxios from '../../../lib/customAxios';
import { ScheduleType } from '../../../lib/types';

export const postSchedule = async (schedule: ScheduleType) => {
  const { data } = await customAxios().post('/calendar/schedule', schedule);

  return data;
};

export const getMySchedules = async () => {
  const { data } = await customAxios().get('/calendar/schedule');

  return data;
};

export const getScheduleById = async (calendarId: number) => {
  const { data } = await customAxios().get(`/calendar/schedule/${calendarId}`);

  return data;
};

export const updateSchedule = async (schedule: ScheduleType) => {
  const { data } = await customAxios().put(
    `/calendar/schedule/${schedule.id}`,
    schedule,
  );
  console.log(data);

  return data;
};

export const deleteSchedule = async (id: number) => {
  await customAxios().delete(`/calendar/schedule/${id}`);
};
