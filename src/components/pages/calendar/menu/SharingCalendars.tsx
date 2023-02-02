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
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { setVisibility } from '../../../../redux/calendar/calendarVisibilitySlice';
import { setModal } from '../../../../redux/calendar/calendarModalSlice';
import { useSharingCalendarList } from '../../../../hooks/calendar/useCalendarShare';

const SharingCalendars = () => {
  const dispatch = useAppDispatch();
  const { calendarShares } = useSharingCalendarList();
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
        <ListItemText primary="공유 캘린더" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {calendarShares.calendarShares.map((calendarShare) => {
            return (
              <ListItem
                key={calendarShare.id}
                sx={{
                  display: 'flex',
                }}
              >
                <ListItemButton
                  sx={{ flex: 5, flexDirection: 'column' }}
                  onClick={() =>
                    dispatch(
                      setModal({
                        modal: 'infoShareCalendar',
                        detail: calendarShare.id,
                      }),
                    )
                  }
                >
                  <Typography>{calendarShare.calendar.name}</Typography>
                  <Typography fontSize="8px">
                    ({calendarShare.calendarOwnerName})
                  </Typography>
                </ListItemButton>
                <Checkbox
                  defaultChecked
                  sx={{ flex: 1 }}
                  onChange={(e) =>
                    dispatch(
                      setVisibility({
                        calendarId: calendarShare.calendar.id + '',
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
              dispatch(setModal({ modal: 'addShareCalendar' }));
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

export default SharingCalendars;
