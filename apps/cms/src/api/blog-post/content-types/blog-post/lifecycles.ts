/**
 * blog-post lifecycles
 */

export default {
  // Validate and handle custom publish dates before creation
  async beforeCreate(event) {
    const { data } = event.params;
    
    // Handle publish_date field
    if (data.publish_date) {
      const publishDate = new Date(data.publish_date);
      
      // Validate date format
      if (isNaN(publishDate.getTime())) {
        throw new Error('Invalid publish_date date format');
      }
      
      // Log custom publish date setting
      console.log(`Setting custom publish date for blog post: ${publishDate.toISOString().split('T')[0]}`);
      
      // Ensure the date is properly formatted as YYYY-MM-DD string
      data.publish_date = publishDate.toISOString().split('T')[0];
    }
  },

  // Handle publish_date updates
  async beforeUpdate(event) {
    const { data } = event.params;
    
    // Handle publish_date field updates
    if (data.publish_date !== undefined) {
      if (data.publish_date === null) {
        // Allow clearing the publish_date field
        console.log('Clearing custom publish date for blog post');
      } else {
        const publishDate = new Date(data.publish_date);
        
        // Validate date format
        if (isNaN(publishDate.getTime())) {
          throw new Error('Invalid publish_date date format');
        }
        
        // Log custom publish date update
        console.log(`Updating custom publish date for blog post: ${publishDate.toISOString().split('T')[0]}`);
        
        // Ensure the date is properly formatted as YYYY-MM-DD string
        data.publish_date = publishDate.toISOString().split('T')[0];
      }
    }
  },

  // Log after successful creation
  async afterCreate(event) {
    const { result } = event;
    
    if (result.publish_date) {
      console.log(`Blog post created with custom publish date: ${result.publish_date}`);
    }
  },

  // Log after successful update
  async afterUpdate(event) {
    const { result } = event;
    
    if (result.publish_date) {
      console.log(`Blog post updated with custom publish date: ${result.publish_date}`);
    }
  },
};
