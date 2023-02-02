import React, { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  selectDateTimeInfo,
  setInfo,
} from '../../../../../redux/calendar/schedule/selectDateTimeInfoSlice';
import dateFormat from '../../../../../lib/dateFormat';

const DateSelectBox = () => {
  const dispatch = useAppDispatch();
  const selectedDateTime = useAppSelector(selectDateTimeInfo);
  const selectedStartDate = new Date(selectedDateTime.start);
  const selectedEndDate = new Date(selectedDateTime.end);
  const formatedStartDate = dateFormat(selectedStartDate);
  const formatedEndDate = dateFormat(selectedEndDate);

  const [isAllday, setIsAllday] = useState(selectedDateTime.isAllday);
  const [dateStart, setDateStart] = useState(formatedStartDate.date);
  const [dateEnd, setDateEnd] = useState(formatedEndDate.date);
  const [timeStart, setTimeStart] = useState(formatedStartDate.time);
  const [timeEnd, setTimeEnd] = useState(formatedEndDate.time);

  useEffect(() => {
    dispatch(
      setInfo({
        start: dateStart + 'T' + timeStart,
        end: dateEnd + 'T' + timeEnd,
        isAllday,
      }),
    );
  }, [dateEnd, dateStart, dispatch, isAllday, timeEnd, timeStart]);

  return (
    <>
      <Box>
        <TextField
          type="date"
          onChange={(e) => setDateStart(e.target.value)}
          label="일정 시작 날짜"
          variant="outlined"
          sx={{ mt: 1 }}
          value={dateStart}
        />
        {!isAllday && (
          <TextField
            type="time"
            value={timeStart}
            sx={{ mt: 1 }}
            onChange={(e) => setTimeStart(e.target.value)}
          />
        )}
      </Box>
      <Box>
        <TextField
          type="date"
          onChange={(e) => setDateEnd(e.target.value)}
          label="일정 종료 날짜"
          variant="outlined"
          sx={{ mt: 1 }}
          value={dateEnd}
        />
        {!isAllday && (
          <TextField
            type="time"
            value={timeEnd}
            sx={{ mt: 1 }}
            onChange={(e) => setTimeEnd(e.target.value)}
          />
        )}
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={isAllday}
            onClick={() => setIsAllday((prev) => !prev)}
          />
        }
        label="일정 종일 여부"
      />
    </>
  );
};

export default DateSelectBox;
