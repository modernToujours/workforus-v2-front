import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useAppSelector } from '../../../redux/hooks';
import { selectIsDrawerOpen } from '../../../redux/drawer/isDrawerOpenSlice';
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
import Link from 'next/link';

interface ListItemType {
  key: React.Key;
  link: string;
  component: React.ReactNode;
}

function DrawerMenuList() {
  const isOpen = useAppSelector(selectIsDrawerOpen);

  const ListItems: ListItemType[] = [
    { key: 'Home', link: '/', component: <Home color="secondary" /> },
    {
      key: 'My Page',
      link: '/mypage',
      component: <AccountBox color="secondary" />,
    },
    { key: 'Mail', link: '/mail', component: <Mail color="secondary" /> },
    {
      key: 'Address',
      link: '/address',
      component: <LocalLibrary color="secondary" />,
    },
    {
      key: 'Calendar',
      link: '/calendar',
      component: <EventAvailable color="secondary" />,
    },
    { key: 'Chat', link: '/chat', component: <Sms color="secondary" /> },
    {
      key: 'Community',
      link: '/community',
      component: <Forum color="secondary" />,
    },
    { key: 'Survey', link: '/survey', component: <Poll color="secondary" /> },
    {
      key: 'Admin',
      link: '/admin',
      component: <SettingsApplications color="secondary" />,
    },
  ];

  return (
    <List>
      {ListItems.map((item) => (
        <Link key={item.key} href={`/${item.link}`}>
          <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
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
        </Link>
      ))}
    </List>
  );
}

export default DrawerMenuList;
