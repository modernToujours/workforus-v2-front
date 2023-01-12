import { EmotionCache } from '@emotion/cache';
import createEmotionCache from '../src/lib/createEmotionCache';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/lib/theme';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../src/react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import AuthProvider from '../src/components/auth/AuthProvider';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// eslint-disable-next-line @typescript-eslint/ban-types
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </AuthProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CacheProvider>
  );
}
