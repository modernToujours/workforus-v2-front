import React, { useState } from 'react';
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
import { useCalendarAdd } from '../../../../../hooks/calendar/useCalendar';

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

const AddCalendarModal = () => {
  const modal = useAppSelector(selectCalendarModal);
  const dispatch = useAppDispatch();
  const addCalendar = useCalendarAdd();
  const [open, setOpen] = useState(
    modal.modal === 'addCalendar' ? true : false,
  );
  const [name, setName] = useState('');
  const [access, setAccess] = useState('0');

  const handleAccess = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccess(event.target.name);
  };

  const handleSave = async () => {
    const calendar = {
      name: name,
      access: access,
    };
    await addCalendar.mutateAsync(calendar);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setModal({ modal: '' }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          캘린더 추가
        </Typography>
        <Divider />
        <FormControl variant="standard" sx={{ m: 3, mt: 5 }}>
          <FormLabel component="legend">캘린더 제목</FormLabel>
          <TextField
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        {/* <UserSearchBox /> */}
        <Button onClick={handleSave}>저장</Button>
      </Box>
    </Modal>
  );
};

export default AddCalendarModal;
