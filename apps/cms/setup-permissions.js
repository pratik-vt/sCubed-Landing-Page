const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function setupPermissions() {
  try {
    console.log('🔐 Setting up API permissions for public access...');

    // Get the public role
    const rolesResponse = await axios.get(`${STRAPI_URL}/api/users-permissions/roles`);
    const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');
    
    if (!publicRole) {
      console.error('❌ Public role not found');
      return;
    }

    console.log(`✅ Found public role with ID: ${publicRole.id}`);

    // Define the permissions we need
    const permissions = {
      'blog-post': ['find', 'findOne'],
      'author': ['find', 'findOne'],
      'category': ['find', 'findOne'],
      'tag': ['find', 'findOne']
    };

    // Current permissions
    const currentPermissions = publicRole.permissions || {};

    // Add our permissions
    Object.keys(permissions).forEach(contentType => {
      if (!currentPermissions[contentType]) {
        currentPermissions[contentType] = {};
      }
      
      permissions[contentType].forEach(action => {
        currentPermissions[contentType][action] = {
          enabled: true,
          policy: ''
        };
      });
    });

    // Update the role
    const updateData = {
      ...publicRole,
      permissions: currentPermissions
    };

    await axios.put(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, updateData);

    console.log('✅ Permissions updated successfully!');
    console.log('🎉 API endpoints are now publicly accessible:');
    console.log('   - GET /api/blog-posts');
    console.log('   - GET /api/blog-posts/:id');
    console.log('   - GET /api/authors');
    console.log('   - GET /api/categories');
    console.log('   - GET /api/tags');

    // Test the API
    console.log('\n🧪 Testing API access...');
    try {
      const testResponse = await axios.get(`${STRAPI_URL}/api/blog-posts`);
      console.log('✅ Blog posts API is working!');
      console.log(`📊 Found ${testResponse.data.data.length} blog posts`);
    } catch (error) {
      console.log('⚠️  API test failed - you may need to create some content first');
    }

  } catch (error) {
    console.error('❌ Error setting up permissions:', error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Manual setup required:');
      console.log('1. Go to: http://localhost:1337/admin');
      console.log('2. Navigate to: Settings → Users & Permissions Plugin → Roles');
      console.log('3. Click on "Public" role');
      console.log('4. Enable permissions for:');
      console.log('   - Blog-post: find, findOne');
      console.log('   - Author: find, findOne');
      console.log('   - Category: find, findOne');
      console.log('   - Tag: find, findOne');
      console.log('5. Click "Save"');
    }
  }
}

// Run the setup
setupPermissions(); 