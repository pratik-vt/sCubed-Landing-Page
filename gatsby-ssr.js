import React from "react";
export const onRenderBody = ({ setHeadComponents }) => {
  const NoFollow = (
    <meta
      name="robots"
      content="noindex, nofollow"
      data-no-index="true"
      key="no-index-ssr-key"
    />
  );
  setHeadComponents([NoFollow]);
};