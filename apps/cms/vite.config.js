import { mergeConfig } from 'vite';

export default (config) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    server: {
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'dev-strapi.scubed.io'
      ]
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
}; 