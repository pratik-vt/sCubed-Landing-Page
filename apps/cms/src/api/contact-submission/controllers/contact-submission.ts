import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact-submission.contact-submission', ({ strapi }) => ({
  async create(ctx) {
    try {
      // Get the request body
      const data = ctx.request.body;
      
      // Add submission date
      data.submission_date = new Date();
      
      // Create the contact submission
      const entity = await strapi.service('api::contact-submission.contact-submission').create({
        data,
      });
      
      // Send email notification (optional - configure email plugin if needed)
      // await strapi.plugins['email'].services.email.send({
      //   to: process.env.ADMIN_EMAIL || 'admin@scubed.com',
      //   subject: 'New Contact Form Submission',
      //   text: `New contact from ${data.first_name} ${data.last_name} (${data.email_id})`,
      // });
      
      return ctx.send({
        message: 'Thank you for your interest in our services! Our team will be in touch shortly.',
        data: entity,
      });
    } catch (error) {
      ctx.badRequest('Failed to submit contact form', { error: error.message });
    }
  },
}));