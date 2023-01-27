import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Checkbox,
  Collapse,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useCalendarList } from '../../../../hooks/calendar/useCalendar';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../../../redux/hooks';
import { setModal } from '../../../../redux/calendar/calendarModalSlice';
import { setVisibility } from '../../../../redux/calendar/calendarVisibilitySlice';

const MyCalendars = () => {
  const dispatch = useAppDispatch();
  const { calendars } = useCalendarList();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleOpen}>
        <ListItemText primary="내 캘린더" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {calendars.calendars.map((calendar) => {
            return (
              <ListItem
                key={calendar.id}
                sx={{
                  display: 'flex',
                }}
              >
                <ListItemButton
                  sx={{ flex: 5 }}
                  onClick={() =>
                    dispatch(
                      setModal({ modal: 'infoCalendar', detail: calendar.id }),
                    )
                  }
                >
                  <Typography>{calendar.name}</Typography>
                </ListItemButton>
                <Checkbox
                  defaultChecked
                  sx={{ flex: 1 }}
                  onChange={(e) =>
                    dispatch(
                      setVisibility({
                        calendarId: calendar.id + '',
                        isVisible: e.target.checked,
                      }),
                    )
                  }
                />
              </ListItem>
            );
          })}
          <ListItemButton
            onClick={() => {
              dispatch(setModal({ modal: 'addCalendar' }));
            }}
            sx={{
              display: 'flex',
            }}
          >
            <ListItem sx={{ flex: 5 }}>
              <ListItemText>추가하기</ListItemText>
            </ListItem>
            <Icon sx={{ flex: 1 }}>
              <AddIcon />
            </Icon>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default MyCalendars;
