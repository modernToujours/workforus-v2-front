import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { drawerWidth } from '../drawer/SideDrawer';
import { selectIsDrawerOpen } from '../../../reducers/drawer/isDrawerOpenSlice';
import { useAppSelector } from '../../../reducers/hooks';
import HeaderMail from './HeaderMail';
import HeaderNotification from './HeaderNotification';
import HeaderAccount from './HeaderAccount';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function HeaderAppbar() {
  const open = useAppSelector(selectIsDrawerOpen);

  return (
    <AppBar
      position="fixed"
      open={open}
      color="transparent"
      sx={{
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <Toolbar>
        <HeaderMail />
        <HeaderNotification />
        <HeaderAccount />
      </Toolbar>
    </AppBar>
  );
}

export default HeaderAppbar;
