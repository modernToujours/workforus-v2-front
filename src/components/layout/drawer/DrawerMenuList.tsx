import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useAppSelector } from '../../../reducers/hooks';
import { selectIsDrawerOpen } from '../../../reducers/drawer/isDrawerOpenSlice';
import {
  AccountBox,
  EventAvailable,
  Forum,
  Home,
  LocalLibrary,
  Mail,
  Poll,
  SettingsApplications,
  Sms,
} from '@mui/icons-material';
import { Typography } from '@mui/material';

interface ListItemType {
  key: React.Key;
  component: React.ReactNode;
}

function DrawerMenuList() {
  const isOpen = useAppSelector(selectIsDrawerOpen);

  const ListItems: ListItemType[] = [
    { key: 'Home', component: <Home color="secondary" /> },
    { key: 'My Page', component: <AccountBox color="secondary" /> },
    { key: 'Mail', component: <Mail color="secondary" /> },
    { key: 'Address', component: <LocalLibrary color="secondary" /> },
    { key: 'Calendar', component: <EventAvailable color="secondary" /> },
    { key: 'Chat', component: <Sms color="secondary" /> },
    { key: 'Community', component: <Forum color="secondary" /> },
    { key: 'Survery', component: <Poll color="secondary" /> },
    { key: 'Admin', component: <SettingsApplications color="secondary" /> },
  ];

  return (
    <List>
      {ListItems.map((item) => (
        <ListItem
          key={item.key}
          disablePadding
          sx={{ display: 'block', mb: 1 }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
              color="secondary"
            >
              {item.component}
            </ListItemIcon>
            {isOpen && (
              <Typography
                color="secondary"
                sx={{ opacity: isOpen ? 1 : 0, background: 'secondary' }}
              >
                {item.key}
              </Typography>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default DrawerMenuList;
