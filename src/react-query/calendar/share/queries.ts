import customAxios from '../../../lib/customAxios';

export const postCalendarShare = async (calendarId: number) => {
  const { data } = await customAxios().post(`/calendar/share/`, {
    calendarId: calendarId,
  });

  return data;
};

export const getCalendarShare = async () => {
  const { data } = await customAxios().get('/calendar/share');
  return data;
};

export const getSharingSchedules = async () => {
  const { data } = await customAxios().get('calendar/share/schedule');
  return data;
};

export const deleteCalendarShare = async (id: number) => {
  await customAxios().delete(`calendar/share/${id}`);
};
