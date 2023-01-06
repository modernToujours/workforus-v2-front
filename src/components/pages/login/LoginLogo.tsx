import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

function LoginLogo() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Image
        src="/logo/logo-main.png"
        alt="main-logo"
        width={260}
        height={80}
      />
    </Box>
  );
}

export default LoginLogo;
