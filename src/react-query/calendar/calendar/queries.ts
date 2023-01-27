import { CalendarType } from '../../../lib/types';
import customAxios from '../../../lib/customAxios';

export const postCalendar = async (calendar: CalendarType) => {
  const { data } = await customAxios().post('/calendar', calendar);

  return data;
};

export const getCalendars = async () => {
  const { data } = await customAxios().get(`/calendar`);

  return data;
};

export const getCalendar = async (id: number) => {
  const { data } = await customAxios().get(`/calendar/${id}`);

  return data.calendars[0];
};

export const updateCalendar = async (calendar: CalendarType) => {
  const { data } = await customAxios().put(
    `/calendar/${calendar.id}`,
    calendar,
  );

  return data;
};

export const deleteCalendar = async (id: number) => {
  await customAxios().delete(`/calendar/${id}`);
};
