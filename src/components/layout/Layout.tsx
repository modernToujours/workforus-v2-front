import React from 'react';
import { Box } from '@mui/material';
import HeaderAppbar from './appbar/HeaderAppbar';
import SideDrawer from './drawer/SideDrawer';
import Footer from './footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box component={'main'} sx={{ display: 'flex' }}>
      <HeaderAppbar />
      <SideDrawer />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ height: '50px' }} />
        {children}
        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;
