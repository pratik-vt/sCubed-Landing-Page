import type { GatsbyConfig } from "gatsby";

// Load environment variables
require('dotenv').config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `scubed-landing-page`,
    siteUrl: process.env.siteURL || "https://default-url.com",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-vanilla-extract",
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.bucketName || "default-bucket-name",
        protocol: "https",
        hostname: process.env.hostname || "default-hostname.com",
      },
    },
  ],
};

export default config;
