import React from 'react';
import { Box, Divider } from '@mui/material';
import FooterBottom from './FooterBottom';
import FooterTop from './FooterTop';

function Footer() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 3 }}>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <FooterTop />
        <Divider />
        <FooterBottom />
      </Box>
    </Box>
  );
}

export default Footer;
