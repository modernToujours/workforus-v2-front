import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import customAxios from '../../../../../lib/customAxios';
import { useAuth } from '../../../../../hooks/useAuth';

export type UserOptionType = {
  id: string;
  name: string;
};

type UserSearchBoxPropsType = {
  addUser: (user: UserOptionType) => void;
  existUsers: UserOptionType[];
};

const UserSearchBox: React.FC<UserSearchBoxPropsType> = ({
  addUser,
  existUsers,
}) => {
  const { id } = useAuth();
  const [option, setOption] = React.useState('이름');
  const [searchList, setSearchList] = useState<{ id: string; name: string }[]>(
    [],
  );

  const handleOptionChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  const handleAutoComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (option === '이름')
      customAxios()
        .get(`/employee?name=${event.target.value}`)
        .then((res) =>
          setSearchList(
            res.data.filter((user: UserOptionType) => {
              if (
                user.id !== id ||
                existUsers.find((exist) => exist.id == user.id)
              )
                return false;
              else return true;
            }),
          ),
        );
    else if (option === '사번')
      customAxios()
        .get(`/employee?id=${event.target.value}`)
        .then((res) =>
          setSearchList(
            res.data.filter((user: UserOptionType) => {
              if (
                user.id !== id ||
                existUsers.find((exist) => exist.id == user.id)
              )
                return false;
              else return true;
            }),
          ),
        );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Select
        sx={{ flex: 1, maxWidth: '100px' }}
        value={option}
        onChange={handleOptionChange}
      >
        <MenuItem value={'이름'}>이름</MenuItem>
        <MenuItem value={'사번'}>사번</MenuItem>
      </Select>
      <Autocomplete
        sx={{ flex: 3 }}
        disablePortal
        options={searchList}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Box sx={{ flex: 2 }}>
              {option.name}({option.id})
            </Box>
            <Button sx={{ flex: 1 }} onClick={() => addUser(option)}>
              추가
            </Button>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} onChange={handleAutoComplete} />
        )}
      />
    </Box>
  );
};

export default UserSearchBox;
