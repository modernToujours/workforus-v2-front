import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  selectCalendarModal,
  setModal,
} from '../../../../../redux/calendar/calendarModalSlice';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useCalendar } from '../../../../../hooks/calendar/useCalendar';
import {
  useCalendarShareDelete,
  useSharingCalendarList,
} from '../../../../../hooks/calendar/useCalendarShare';
import { setAlert } from '../../../../../redux/layout/alertbar';

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

const SharingCalendarInfoModal = () => {
  const modal = useAppSelector(selectCalendarModal);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(
    modal.modal === 'infoShareCalendar' ? true : false,
  );
  const useDeleteSharingCalendar = useCalendarShareDelete();
  const { calendarShares } = useSharingCalendarList();
  //   eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const calendarShareId = modal.detail!;
  const shraringCalendarInfo = calendarShares.calendarShares.find(
    (item) => (item.id = calendarShareId),
  );
  const { calendar } = useCalendar(
    //   eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    shraringCalendarInfo!.calendar.id!,
  );

  useEffect(() => {
    console.log(calendar);
  }, [calendar]);
  useEffect(() => {
    console.log(calendarShares);
  }, [calendarShares]);

  const handleDelete = async () => {
    await useDeleteSharingCalendar.mutateAsync(calendarShareId);
    dispatch(
      setAlert({
        message: '공유 해제에 성공하셨습니다.!!',
        severity: 'info',
      }),
    );
    setOpen(false);
    dispatch(setModal({ modal: '' }));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setModal({ modal: '' }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          공유 캘린더 정보
        </Typography>
        <Divider />
        <FormControl variant="standard" sx={{ m: 3, mt: 5 }}>
          <FormLabel component="legend">캘린더 제목</FormLabel>
          <TextField disabled variant="outlined" value={calendar.name} />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 3, mt: 1 }}>
          <FormLabel component="legend">캘린더 생성자</FormLabel>
          <TextField
            disabled
            variant="outlined"
            value={`${shraringCalendarInfo?.calendarOwnerName}(${shraringCalendarInfo?.calendarOwnerId})`}
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleDelete}>공유 해제</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SharingCalendarInfoModal;
