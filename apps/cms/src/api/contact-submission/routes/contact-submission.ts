import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact-submission.contact-submission', {
  config: {
    create: {
      auth: false, // Allow public access to create contact submissions
    },
  },
});