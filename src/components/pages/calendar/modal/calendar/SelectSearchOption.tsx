import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

type SelectSearchOptinProps = {
  searchOption: string;
  onChange: (event: SelectChangeEvent) => void;
};

const SelectSearchOption: React.FC<SelectSearchOptinProps> = ({
  searchOption,
  onChange,
}) => {
  return (
    <Select
      sx={{ flex: 1 }}
      value={searchOption}
      onChange={onChange}
      defaultValue="이름"
    >
      <MenuItem value={'이름'}>이름</MenuItem>
      <MenuItem value={'사번'}>사번</MenuItem>
    </Select>
  );
};

export default SelectSearchOption;
