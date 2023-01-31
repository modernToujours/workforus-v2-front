import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  selectCalendarModal,
  setModal,
} from '../../../../../redux/calendar/calendarModalSlice';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material';
import {
  useCalendar,
  useCalendarDelete,
  useCalendarUpdate,
} from '../../../../../hooks/calendar/useCalendar';
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

const CalendarInfoModal = () => {
  const modal = useAppSelector(selectCalendarModal);
  const dispatch = useAppDispatch();
  const updateCalendar = useCalendarUpdate();
  const deleteCalendar = useCalendarDelete();
  const [open, setOpen] = useState(
    modal.modal === 'infoCalendar' ? true : false,
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { calendar, isLoading } = useCalendar(modal.detail!);
  const [name, setName] = useState('');
  const [access, setAccess] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setAccess(calendar.access);
    setName(calendar.name);
  }, [calendar, isLoading]);

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const newName = event.target.value;
    setName(newName);
    if (newName !== '' && (newName.length < 2 || newName.length > 6)) {
      setErrorMessage('캘린더 이름은 2~6글자를 입력해주세요.');
    } else {
      setErrorMessage('');
    }
  };

  const handleAccess = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccess(event.target.name);
  };

  const handleError = () => {
    dispatch(
      setAlert({ message: '캘린더 이름란을 확인해주세요.', severity: 'error' }),
    );
  };

  const handleUpdate = async () => {
    const cal = {
      ...calendar,
      name: name,
      access: access,
    };
    if (name.length < 2 || name.length > 6) {
      setErrorMessage('캘린더 이름을 입력해주세요.');
      handleError();
    } else {
      await updateCalendar.mutateAsync(cal);
      dispatch(
        setAlert({
          message: '캘린더 수정이 완료되었습니다.',
          severity: 'info',
        }),
      );
      handleClose();
    }
  };

  const handleDelete = async () => {
    handleClose();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await deleteCalendar.mutateAsync(modal.detail!);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setModal({ modal: '' }));
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
          캘린더 정보
        </Typography>
        <Divider />
        <FormControl variant="standard" sx={{ m: 3, mt: 5 }}>
          <FormLabel component="legend">캘린더 제목</FormLabel>
          <TextField
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>
        <FormControl component="fieldset" sx={{ m: 3 }} variant="standard">
          <FormLabel component="legend">캘린더 공개 여부</FormLabel>
          <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={access === '0'}
                  onChange={handleAccess}
                  name="0"
                />
              }
              label="전체 공개"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={access === '1'}
                  onChange={handleAccess}
                  name="1"
                />
              }
              label="수락 후 공개"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={access === '2'}
                  onChange={handleAccess}
                  name="2"
                />
              }
              label="비공개"
            />
          </FormGroup>
        </FormControl>
        <Box justifyContent="flex-end">
          <Button onClick={handleUpdate}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CalendarInfoModal;
