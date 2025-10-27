module.exports = {
  /**
   * Content Manager server-side extension
   * Enables editing of publishedAt field for blog posts
   */
  
  // Register the extension
  register({ strapi }) {
    // Override content manager service to handle publishedAt field editing
    strapi.plugin('content-manager').service('entity-manager').extendEntity = function(originalExtend) {
      return function(uid, entity, options = {}) {
        // Allow publishedAt to be manually set for blog posts
        if (uid === 'api::blog-post.blog-post' && entity.publishedAt) {
          // Validate the publishedAt date format
          const publishDate = new Date(entity.publishedAt);
          if (isNaN(publishDate.getTime())) {
            throw new Error('Invalid publishedAt date format');
          }
          
          // Ensure publishedAt is not in the future (optional validation)
          const now = new Date();
          if (publishDate > now) {
            console.warn('Warning: Setting publishedAt to a future date');
          }
        }
        
        return originalExtend.call(this, uid, entity, options);
      };
    }(strapi.plugin('content-manager').service('entity-manager').extendEntity);
  },

  bootstrap({ strapi }) {
    // Additional bootstrap logic if needed
    console.log('Content Manager extension loaded for enhanced publishedAt control');
  },
};
