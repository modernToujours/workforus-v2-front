import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  selectCalendarModal,
  setModal,
} from '../../../../../redux/calendar/calendarModalSlice';
import { Button, Divider } from '@mui/material';
import DateSelectBox from './DateSelectBox';
import ScheduleInfoBox from './ScheduleInfoBox';
import {
  selectDateTimeInfo,
  setInfo,
} from '../../../../../redux/calendar/schedule/selectDateTimeInfoSlice';
import {
  selectScheduleInfo,
  setScheduleInfo,
} from '../../../../../redux/calendar/schedule/scheduleInfoSlice';
import {
  useSchedule,
  useScheduleDelete,
  useScheduleUpdate,
} from '../../../../../hooks/calendar/useSchedule';
import dateFormat from '../../../../../lib/dateFormat';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

const ScheduleInfoModal = () => {
  const dispatch = useAppDispatch();
  const updateSchedule = useScheduleUpdate();
  const deleteShcedule = useScheduleDelete();
  const modal = useAppSelector(selectCalendarModal);
  const dateInfo = useAppSelector(selectDateTimeInfo);

  const scheduleInfo = useAppSelector(selectScheduleInfo);
  // const addSchedule = useScheduleAdd();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { schedules, isLoading } = useSchedule(modal.detail!);

  const [open, setOpen] = useState(
    modal.modal === 'infoSchedule' ? true : false,
  );

  useEffect(() => {
    if (!isLoading) {
      const scheduleInfo = schedules.schedules[0];
      const {
        calendarId,
        title,
        body,
        startDate,
        startTime,
        endDate,
        endTime,
        isAllday,
      } = scheduleInfo;
      dispatch(setScheduleInfo({ calendarId, title, body }));
      dispatch(
        setInfo({
          start: startDate + 'T' + startTime,
          end: endDate + 'T' + endTime,
          isAllday,
        }),
      );
    }
  }, [schedules, isLoading, dispatch]);

  const handleClose = () => {
    setOpen(false);
    dispatch(setModal({ modal: '' }));
  };

  const handleUpdate = async () => {
    const selectedStartDate = new Date(dateInfo.start);
    const selectedEndDate = new Date(dateInfo.end);
    const formatedStartDate = dateFormat(selectedStartDate);
    const formatedEndDate = dateFormat(selectedEndDate);

    const sche = {
      ...schedules.schedules[0],
      ...scheduleInfo,
      startDate: formatedStartDate.date,
      endDate: formatedEndDate.date,
      isAllday: dateInfo.isAllday,
      startTime: formatedStartDate.time,
      endTime: formatedEndDate.time,
    };

    await updateSchedule.mutateAsync(sche);
    handleClose();
  };

  const handleDelete = async () => {
    handleClose();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await deleteShcedule.mutateAsync(schedules.schedules[0].id!);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          일정 정보
        </Typography>
        <Divider />
        <ScheduleInfoBox />
        <DateSelectBox />
        <Divider />
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleUpdate}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ScheduleInfoModal;
