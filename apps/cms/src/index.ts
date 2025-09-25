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
          await strapi.query('plugin::users-permissions.permission').update({
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
                $in: [
                  'api::category.category.find',
                  'api::category.category.findOne',
                ],
              },
            },
          });

        for (const perm of categoryPermissions) {
          await strapi.query('plugin::users-permissions.permission').update({
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
  },
};
