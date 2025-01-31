import type { GatsbyConfig } from 'gatsby';

// Load environment variables
require('dotenv').config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Best Practice Management & Billing Software for Therapy Practices | S Cubed`,
    description:
      'An easy-to-use, flexible practice management software designed for Speech, Occupational, Physical, and Applied Behavioral Analysis (ABA) therapy. Streamline data collection, billing, scheduling, document management, reporting, and more with automated alerts and a secure guardian portal.',
    keywords:
      'Data Collection, Billing, Calendar, Appointment, Automatic Alerts, Guardian Portal, Reporting, Document Management, Speech Therapy, Occupational Therapy, Physical Therapy, ABA Therapy, Counselling',
    siteUrl: process.env.siteURL || 'https://scubed.io',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-vanilla-extract',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `capability-images`,
        // Path to the directory
        path: `${__dirname}/src/images/tabs/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `S Cubed`,
        short_name: `S Cubed`,
        start_url: `/`,
        background_color: `#f9f9f9`,
        theme_color: `#7a7eed`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        sitemap: null,
        host: null,
        resolveEnv: () => process.env.GATSBY_APP_ENV,
        env: {
          dev: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          stage: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          prod: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.bucketName || 'default-bucket-name',
        protocol: 'https',
        hostname: process.env.hostname || 'default-hostname.com',
      },
    },
  ],
};

export default config;
