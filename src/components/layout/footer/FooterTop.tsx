import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

function FooterTop() {
  return (
    <Box sx={{ display: 'flex', marginBottom: 1 }}>
      <Box marginRight={1}>
        <Image src="/logo/logo1.png" alt="main-logo" width={45} height={45} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography>
            회사소개 | 인재채용 | 이용약관 | 개인정보취급방침 | 고객센터
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography>
            workforus | 서울특별시 강남구 테헤란로14길 6 남도빌딩 2F, 3F, 4F,
            5F, 6F | 사업자등록번호:000-00-00000
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default FooterTop;
