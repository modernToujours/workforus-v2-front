import { EmotionCache } from '@emotion/cache';
import createEmotionCache from '../src/lib/createEmotionCache';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/lib/theme';
import { CssBaseline, Drawer } from '@mui/material';

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
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <>
          <Drawer />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    </CacheProvider>
  );
}
