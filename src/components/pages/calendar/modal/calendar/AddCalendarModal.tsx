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
import UserSearchBox, { UserOptionType } from './UserSearchBox';
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

const AddCalendarModal = () => {
  const modal = useAppSelector(selectCalendarModal);
  const dispatch = useAppDispatch();
  const addCalendar = useCalendarAdd();
  const [open, setOpen] = useState(
    modal.modal === 'addCalendar' ? true : false,
  );
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [access, setAccess] = useState('0');
  const [userList, setUserList] = useState<UserOptionType[]>([]);

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

  const addUser = (user: UserOptionType) => {
    setUserList((prev) => [...prev, user]);
  };

  const handleError = () => {
    dispatch(
      setAlert({ message: '캘린더 이름란을 확인해주세요.', severity: 'error' }),
    );
  };

  const handleSave = async () => {
    const sharers = userList.map((user) => user.id);
    const calendar = {
      name: name,
      access: access,
      sharers: sharers,
    };
    if (name.length < 2 || name.length > 6) {
      setErrorMessage('캘린더 이름을 입력해주세요.');
      handleError();
    } else {
      await addCalendar.mutateAsync(calendar);
      dispatch(
        setAlert({ message: '캘린더를 생성하셨습니다.', severity: 'info' }),
      );
      handleClose();
    }
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
            error={!!errorMessage}
            helperText={errorMessage}
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
        <Box sx={{ m: 3 }}>
          <Box>공유상대 추가</Box>

          <UserSearchBox addUser={addUser} existUsers={userList} />
          {userList.length !== 0 && (
            <>
              <Box sx={{ mt: 2 }}>
                <Box>공유상대 목록</Box>
                {userList.map((user) => {
                  return (
                    <Box key={user.id} sx={{ display: 'flex' }}>
                      {user.name}({user.id})
                    </Box>
                  );
                })}
              </Box>
            </>
          )}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleSave}>저장</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCalendarModal;
