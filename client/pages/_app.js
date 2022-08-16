import { SWRConfig } from 'swr';
import { getData } from '../utils/fetcher';
import { Provider } from '../context';
import { Toastify } from '../utils/Toast';
import Layout from '../components/Layout';
import RenderOnAuthenticated from '../components/Authentication/RenderOnAuthenticated';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();
  const { asPath } = router;

  console.log('Aspath: ', asPath);

  if (
    asPath == '/login' ||
    asPath == '/register' ||
    asPath.includes('/user/emailverification') ||
    asPath == '/user/forgotpassword' ||
    asPath.includes('/user/resetpassword')
  ) {
    return (
      <Toastify>
        <Provider>
          <SWRConfig
            value={{
              fetcher: getData,
              revalidateOnReconnect: true,
              revalidateOnFocus: true,
              refreshInterval: 10000,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </Provider>
      </Toastify>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Toastify>
          <SWRConfig
            value={{
              fetcher: getData,
              revalidateOnReconnect: true,
              revalidateOnFocus: true,
              refreshInterval: 10000,
              // onError: errorHandler,
              // onSuccess: successHandler,
            }}
          >
            <Provider>
              <div>
                <RenderOnAuthenticated>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </RenderOnAuthenticated>
              </div>
            </Provider>
          </SWRConfig>
        </Toastify>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
