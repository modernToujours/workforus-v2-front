import { EmotionCache } from '@emotion/cache';
import createEmotionCache from '../src/lib/createEmotionCache';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/lib/theme';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { Box } from '@mui/material';
import SideDrawer from '../src/components/layout/drawer/SideDrawer';
import store from '../src/reducers/store';
import HeaderAppbar from '../src/components/layout/appbar/HeaderAppbar';
import Footer from '../src/components/layout/footer/Footer';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <HeaderAppbar />
            <SideDrawer />
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <Box sx={{ height: '50px' }} />
              <Component {...pageProps} />
              <Footer />
            </Box>
          </Box>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
