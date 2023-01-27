import { useState } from 'react';
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
import { selectDateTimeInfo } from '../../../../../redux/calendar/schedule/selectDateTimeInfoSlice';
import { selectScheduleInfo } from '../../../../../redux/calendar/schedule/scheduleInfoSlice';
import { useScheduleAdd } from '../../../../../hooks/calendar/useSchedule';
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

const AddScheduleModal = () => {
  const modal = useAppSelector(selectCalendarModal);
  const dateInfo = useAppSelector(selectDateTimeInfo);
  const scheduleInfo = useAppSelector(selectScheduleInfo);
  const addSchedule = useScheduleAdd();

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(
    modal.modal === 'addSchedule' ? true : false,
  );

  const handleClose = () => {
    setOpen(false);
    dispatch(setModal({ modal: '' }));
  };

  const handleSave = async () => {
    const selectedStartDate = new Date(dateInfo.start);
    const selectedEndDate = new Date(dateInfo.end);
    const formatedStartDate = dateFormat(selectedStartDate);
    const formatedEndDate = dateFormat(selectedEndDate);

    await addSchedule.mutateAsync({
      ...scheduleInfo,
      startDate: formatedStartDate.date,
      endDate: formatedEndDate.date,
      isAllday: dateInfo.isAllday,
      startTime: formatedStartDate.time,
      endTime: formatedEndDate.time,
    });
    handleClose();
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
          일정 추가
        </Typography>
        <Divider />
        <ScheduleInfoBox />
        <DateSelectBox />
        <Divider />
        <Button onClick={handleSave}>저장</Button>
      </Box>
    </Modal>
  );
};

export default AddScheduleModal;
