import React from 'react';

import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { Layout } from '~/components';
import { theme } from '~/theme';

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title key='title'>Rolling Codes</title>
        <meta name="description" content="Thom Morgan projects and resume" />
        <meta
          key='og:title'
          property="og:title"
          content="Rolling Codes" />
        <meta
          key='og:description'
          property="og:description"
          content="Thom Morgan projects and resume" />
        <meta
          key='og:image'
          property="og:image"
          content="/sms-banner.png" />
        <meta
          key='og:url'
          property="og:url"
          content="https://www.rollingcodes.ai" />
        <meta
          key='og:site_name'
          property="og:site_name"
          content="Rolling Codes" />
        <meta
          key='robots'
          name="robots"
          content="index, follow" />
        <meta
          key='viewport'
          name="viewport"
          content="width=device-width, initial-scale=1" />
        <meta
          key='msapplication-TileImage'
          name="msapplication-TileColor"
          content="#da532c" />
        <meta
          key='theme-color'
          name="theme-color"
          content="#0a0e27" />
      </Head>
      <MuiThemeProvider theme={ theme }>
        <CssBaseline />
        <ThemeProvider theme={ theme }>
          <Layout>
            <Component { ...pageProps } />
          </Layout>
        </ThemeProvider>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
