import React from 'react';

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  const NoFollow = (
    <meta
      name="robots"
      content={
        process.env.GATSBY_APP_ENV === 'prod'
          ? 'index, follow'
          : 'noindex, nofollow'
      }
      key={
        process.env.GATSBY_APP_ENV === 'prod'
          ? 'index-ssr-key'
          : 'no-index-ssr-key'
      }
    />
  );

  // Google Tag Manager components (only in production)
  const headComponents = [NoFollow];
  const bodyComponents = [];

  if (process.env.GATSBY_APP_ENV === 'prod') {
    // Google Tag Manager script for head
    const GTMHead = (
      <script
        key="gtm-head"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WFFCJJSB');
          `,
        }}
      />
    );

    // Google Tag Manager noscript for body
    const GTMBody = (
      <noscript
        key="gtm-body"
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WFFCJJSB"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
    );

    headComponents.push(GTMHead);
    bodyComponents.push(GTMBody);
  }

  setHeadComponents(headComponents);
  setPreBodyComponents(bodyComponents);
};
