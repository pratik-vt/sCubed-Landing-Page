import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Enable public access to events and categories
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      // Update permissions for events
      try {
        const eventPermissions = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({
            where: {
              role: publicRole.id,
              action: {
                $in: ['api::event.event.find', 'api::event.event.findOne'],
              },
            },
          });

        for (const perm of eventPermissions) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: perm.id },
              data: { enabled: true },
            });
        }

        // Update permissions for categories
        const categoryPermissions = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({
            where: {
              role: publicRole.id,
              action: {
                $in: ['api::category.category.find', 'api::category.category.findOne'],
              },
            },
          });

        for (const perm of categoryPermissions) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: perm.id },
              data: { enabled: true },
            });
        }

        console.log('✓ Public permissions enabled for events and categories');
      } catch (error) {
        console.log('Could not update permissions:', error.message);
      }
    }

    // Create sample event categories if they don't exist
    const categories = [
      { name: 'Conference', slug: 'conference', color: '#7a7eed' },
      { name: 'Webinar', slug: 'webinar', color: '#06b6d4' },
      { name: 'Workshop', slug: 'workshop', color: '#10b981' },
      { name: 'Training', slug: 'training', color: '#8b5cf6' },
      { name: 'Announcement', slug: 'announcement', color: '#f59e0b' },
    ];

    for (const category of categories) {
      const existing = await strapi.db
        .query('api::category.category')
        .findOne({ where: { slug: category.slug } });

      if (!existing) {
        await strapi.db.query('api::category.category').create({
          data: { ...category, publishedAt: new Date() },
        });
        console.log(`✓ Created category: ${category.name}`);
      }
    }

    // Check if we need to create sample events
    const eventCount = await strapi.db.query('api::event.event').count();

    if (eventCount === 0) {
      console.log('Creating sample events...');

      const conferenceCategory = await strapi.db
        .query('api::category.category')
        .findOne({ where: { slug: 'conference' } });
      const webinarCategory = await strapi.db
        .query('api::category.category')
        .findOne({ where: { slug: 'webinar' } });
      const workshopCategory = await strapi.db
        .query('api::category.category')
        .findOne({ where: { slug: 'workshop' } });

      const sampleEvents = [
        {
          title: 'ABA Therapy Innovation Summit 2025',
          slug: 'aba-therapy-innovation-summit-2025',
          excerpt: 'Join industry leaders for an exclusive conference on the latest advancements in ABA therapy practice management.',
          description: 'Join industry leaders for an exclusive conference on the latest advancements in ABA therapy practice management, insurance billing innovations, and regulatory compliance updates.',
          start_date: new Date('2025-02-15T09:00:00'),
          end_date: new Date('2025-02-15T17:00:00'),
          location: 'Orlando Convention Center, FL',
          featured: false,
          categories: conferenceCategory ? [conferenceCategory.id] : [],
          publishedAt: new Date(),
        },
        {
          title: 'Mastering Insurance Authorization Workflows',
          slug: 'mastering-insurance-authorization-workflows',
          excerpt: 'Learn proven strategies to streamline your authorization process and reduce denial rates.',
          description: 'Learn proven strategies to streamline your authorization process, reduce denial rates, and accelerate reimbursements.',
          start_date: new Date('2025-01-28T14:00:00'),
          end_date: new Date('2025-01-28T15:30:00'),
          location: 'Virtual Webinar',
          featured: true,
          categories: webinarCategory ? [webinarCategory.id] : [],
          publishedAt: new Date(),
        },
        {
          title: 'S Cubed 4.0 Release: Next-Gen Practice Management',
          slug: 's-cubed-4-0-release',
          excerpt: 'Be the first to experience our groundbreaking new features including AI-powered scheduling.',
          description: 'Be the first to experience our groundbreaking new features including AI-powered scheduling optimization and billing automation.',
          start_date: new Date('2025-02-01T11:00:00'),
          end_date: new Date('2025-02-01T12:00:00'),
          location: 'Virtual Launch Event',
          featured: true,
          categories: webinarCategory ? [webinarCategory.id] : [],
          publishedAt: new Date(),
        },
      ];

      for (const event of sampleEvents) {
        await strapi.db.query('api::event.event').create({ data: event });
        console.log(`✓ Created event: ${event.title}`);
      }
    }
  },
};