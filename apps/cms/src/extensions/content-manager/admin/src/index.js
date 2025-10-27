import { prefixPluginTranslations } from '@strapi/helper-plugin';
import EditViewRightLinks from './components/EditViewRightLinks';

const name = 'content-manager-extension';

export default {
  register(app) {
    // Note: We're now using admin app configuration for layout instead of custom components
    console.log('Content manager extension registered for publish date field control');
  },

  bootstrap(app) {
    // Bootstrap logic for the admin extension
    console.log('Content manager extension bootstrapped');
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, name),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
