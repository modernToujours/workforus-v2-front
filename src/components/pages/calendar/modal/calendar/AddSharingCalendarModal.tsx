import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Modal,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import {
  selectCalendarModal,
  setModal,
} from '../../../../../redux/calendar/calendarModalSlice';
import customAxios from '../../../../../lib/customAxios';
import { CalendarType } from '../../../../../lib/types';
import SelectSearchOption from './SelectSearchOption';
import { useCalendarShareAdd } from '../../../../../hooks/calendar/useCalendarShare';

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

const AddSharingCalendarModal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectCalendarModal);
  const [open, setOpen] = useState(
    modal.modal === 'addShareCalendar' ? true : false,
  );
  const [searchValue, setSearchValue] = useState('');
  const [targetEmp, setTargetEmp] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchOption, setSearchOption] = React.useState('이름');
  const [searchList, setSearchList] = useState<{ id: string; name: string }[]>(
    [],
  );
  const addSharingCalendar = useCalendarShareAdd();

  const handleClose = () => {
    setOpen(false);
    dispatch(setModal({ modal: '' }));
  };

  const handleOptionChange = (event: SelectChangeEvent) => {
    setSearchOption(event.target.value as string);
  };

  const handleAutoComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchOption === '이름')
      customAxios()
        .get(`/employee?name=${event.target.value}`)
        .then((res) => setSearchList(res.data));
    else if (searchOption === '사번')
      customAxios()
        .get(`/employee?id=${event.target.value}`)
        .then((res) => setSearchList(res.data));
  };

  const handleSearchCalendar = () => {
    if (targetEmp) {
      customAxios()
        .get(`/calendar?employeeId=${targetEmp}`)
        .then((res) => setSearchResult(res.data.calendars));
    }
  };

  const handleAddSharingCalendar = (id: number) => {
    addSharingCalendar.mutateAsync(id);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          공유 캘린더 추가
        </Typography>
        <Divider />{' '}
        <Box sx={{ display: 'flex' }}>
          <SelectSearchOption
            searchOption={searchOption}
            onChange={handleOptionChange}
          />
          <Autocomplete
            sx={{ flex: 3 }}
            disablePortal
            options={searchList}
            inputValue={searchValue}
            onInputChange={(e, newValue) => setSearchValue(newValue)}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                onClick={() => {
                  setTargetEmp(option.id);
                  setSearchValue(
                    searchOption === '이름' ? option.name : option.id,
                  );
                }}
              >
                <Box sx={{ flex: 1 }}>사번 : {option.id}</Box>
                <Box sx={{ flex: 1 }}>이름 : {option.name}</Box>
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} onChange={handleAutoComplete} />
            )}
          />
          <Button sx={{ flex: 1 }} onClick={handleSearchCalendar}>
            검색하기
          </Button>
        </Box>
        {searchResult.length !== 0 && (
          <Box>
            {searchResult.map((calendar: CalendarType) => {
              return (
                <Box sx={{ display: 'flex' }} key={calendar.id}>
                  <Box>{calendar.name}</Box>
                  <Button
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    onClick={() => handleAddSharingCalendar(calendar.id!)}
                  >
                    ADD
                  </Button>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default AddSharingCalendarModal;
