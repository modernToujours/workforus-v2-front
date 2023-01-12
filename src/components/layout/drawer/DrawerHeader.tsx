import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  close,
  open,
  selectIsDrawerOpen,
} from '../../../redux/drawer/isDrawerOpenSlice';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Image from 'next/image';

const DrawerHeaderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  marginBottom: 4,
  height: '50px',
  marginTop: 2,
  ...theme.mixins.toolbar,
}));

function DrawerHeader() {
  const isOpen = useAppSelector(selectIsDrawerOpen);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    dispatch(open());
  };

  const handleDrawerClose = () => {
    dispatch(close());
  };

  return (
    <DrawerHeaderWrapper>
      {!isOpen ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: '2px' }}
          >
            <MenuIcon color="secondary" />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton sx={{ marginRight: 3 }}>
            <Image
              src="/logo/logo-main.png"
              alt="main-logo"
              width={130}
              height={40}
            />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon color="secondary" />
          </IconButton>
        </>
      )}
    </DrawerHeaderWrapper>
  );
}

export default DrawerHeader;
