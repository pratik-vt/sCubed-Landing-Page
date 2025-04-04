import React from 'react';

import { useSiteMetadata } from '../../hooks/useSiteMetadata';

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<Props> = ({ title, description, children }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    keywords,
    googleSiteVerification,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
  };

  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={keywords} />
      {googleSiteVerification && (
        <meta
          name="google-site-verification"
          content={googleSiteVerification}
        />
      )}
      {children}
    </>
  );
};

export default SEO;
