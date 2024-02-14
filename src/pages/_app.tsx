import React from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

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
        {/* <meta
          key='twitter:title'
          property="twitter:title" 
          content="Rolling Codes" />
        <meta
          key='twitter:description'
          property="twitter:description"
          content="Thom Morgan projects and resume" />
        <meta
          key='twitter:image'
          property="twitter:image"
          content="/twitter-card.png" />
        <meta
          key='twitter:card'
          content="summary" 
          name="twitter:card" />
        <meta
          key='twitter:site'
          name="twitter:site"
          content="@rolling_codes" />
        <meta
          key='twitter:creator'
          name="twitter:creator"
          content="@rolling_codes" />
        <meta
          key='fb:app_id'
          property="fb:app_id" 
          content={ process.env.NEXT_PUBLIC_FACEBOOK_ID } /> */}
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
          content="#ffffff" />
        <style>
          {`
            body {
              margin: 0;
              padding: 0;
              font-family: OpenSans, -apple-system, "system-ui", BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              background-color: #f5f5f5;
            }
          `}
        </style>
      </Head>
      <Component { ...pageProps } />
    </React.Fragment>
  );
}

export default App;
