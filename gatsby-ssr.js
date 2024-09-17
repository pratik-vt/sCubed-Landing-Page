import React from "react";
export const onRenderBody = ({ setHeadComponents }) => {
  const NoFollow = (
    <meta
      name="robots"
      content={process.env.GATSBY_APP_ENV === 'prod' ? 'index, follow' : 'noindex, nofollow'}
      key={process.env.GATSBY_APP_ENV === 'prod' ? 'index-ssr-key' : 'no-index-ssr-key'}
    />
  );
  setHeadComponents([NoFollow]);
};