import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCalendarList } from '../../../../../hooks/calendar/useCalendar';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  selectScheduleInfo,
  setScheduleInfo,
} from '../../../../../redux/calendar/schedule/scheduleInfoSlice';

const ScheduleInfoBox = () => {
  const { calendars, isLoading } = useCalendarList();
  const info = useAppSelector(selectScheduleInfo);
  const dispatch = useAppDispatch();

  const [calId, setCalId] = useState(info.calendarId);
  const [title, setTitle] = useState(info.title);
  const [body, setBody] = useState(info.body);

  useEffect(() => {
    setCalId(info.calendarId);
  }, [info]);

  const handleOnChange = () => {
    dispatch(setScheduleInfo({ calendarId: calId, title: title, body: body }));
  };

  return (
    <>
      <FormControl>
        <InputLabel id="calendar-name-label">캘린더</InputLabel>
        {!isLoading && (
          <Select
            labelId="calendar-name-label"
            id="calendar-select"
            label="캘린더"
            value={calId === 0 ? '' : calId}
            onChange={(e) => {
              setCalId(e.target.value as number);
              handleOnChange();
            }}
          >
            {calendars.calendars.map((calendar) => (
              <MenuItem key={calendar.id} value={calendar.id}>
                {calendar.name}
              </MenuItem>
            ))}
          </Select>
        )}
        <FormHelperText>캘린더를 선택해주세요.</FormHelperText>
      </FormControl>
      <TextField
        label="일정 제목"
        variant="outlined"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          handleOnChange();
        }}
      />
      <TextField
        label="일정 내용"
        variant="outlined"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          handleOnChange();
        }}
      />
    </>
  );
};

export default ScheduleInfoBox;
