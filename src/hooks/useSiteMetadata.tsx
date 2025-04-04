import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          keywords
          siteUrl
          googleSiteVerification
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
