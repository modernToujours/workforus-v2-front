export type UserType = {
  id: string;
  password?: string;
  name?: string;
  roles?: { name: string }[];
};

export type CalendarType = {
  id?: number;
  empId?: string;
  name: string;
  access: string;
};

export type ScheduleType = {
  id?: number;
  calendarId: number;
  employeeId?: string;
  title: string;
  body: string;
  startDate: string;
  endDate: string;
  isAllday: boolean;
  startTime?: string;
  endTime?: string;
};

export type CalendarShareType = {
  id?: number;
  employeeId?: number;
  calendarOwnerId?: string;
  calendarOwnerName?: string;
  calendar: CalendarType;
};
