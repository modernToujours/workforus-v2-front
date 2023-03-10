import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/auth/authSlice';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

function HeaderAccount() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { name, roles, isLogin } = useAuth();
  const dispacth = useAppDispatch();
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispacth(logout());
    setCookie('token', null);
    handleClose();
    router.push('/login');
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: '#999',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={'bolder'}
            lineHeight={'1.5'}
          >
            {name || 'GUEST'}
          </Typography>
          <Typography variant="subtitle2">{roles[0]}</Typography>
        </Box>
        <AccountCircle fontSize="large" />
      </Button>
      {!isLogin ? (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => router.push('/login')}>Login</MenuItem>
        </Menu>
      ) : (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </Menu>
      )}
    </div>
  );
}

export default HeaderAccount;
