import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    // Configure content manager layout for blog posts
    contentManager: {
      editView: {
        'api::blog-post.blog-post': {
          layout: [
            [
              {
                name: 'title',
                size: 6,
              },
              {
                name: 'slug',
                size: 6,
              },
            ],
            [
              {
                name: 'excerpt',
                size: 12,
              },
            ],
            [
              {
                name: 'publish_date',
                size: 6,
              },
              {
                name: 'featured',
                size: 6,
              },
            ],
            [
              {
                name: 'content_blocks',
                size: 12,
              },
            ],
          ],
        },
      },
      listView: {
        'api::blog-post.blog-post': {
          // Sort by custom publish_date in admin list view
          sort: {
            defaultSort: 'publish_date:desc',
          },
        },
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log('Strapi admin app bootstrapped with enhanced publishedAt control');
  },
};
