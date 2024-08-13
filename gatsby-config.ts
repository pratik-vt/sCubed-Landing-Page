import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `scubed-landing-page`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-vanilla-extract",
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{userAgent: '*', disallow: '/'}]
      }
    }
  ],
}

export default config
