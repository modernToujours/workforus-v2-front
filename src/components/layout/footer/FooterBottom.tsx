import { Box, Typography } from '@mui/material';
import React from 'react';

function FooterBottom() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        marginTop: 1,
      }}
    >
      <Typography>2023 © modernTojours</Typography>
    </Box>
  );
}

export default FooterBottom;
