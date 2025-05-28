
import React from 'react';

import { GOOGLE_MEASUREMENT_ID } from '~/env';

export function GoogleAnalytics() {
  return (
    <React.Fragment>
      <script src={ `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}` } />
      <script dangerouslySetInnerHTML={ {
        __html: 
          `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_MEASUREMENT_ID}');`,
      } } />
    </React.Fragment>
  );
}