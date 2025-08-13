#!/bin/bash

# Function to create API files for a content type
create_api_files() {
  local type=$1
  
  # Routes
  cat > src/api/$type/routes/$type.ts << EOL
/**
 * $type router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::$type.$type');
EOL

  # Controllers  
  cat > src/api/$type/controllers/$type.ts << EOL
/**
 * $type controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::$type.$type');
EOL

  # Services
  cat > src/api/$type/services/$type.ts << EOL
/**
 * $type service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::$type.$type');
EOL

  echo "✅ Created API files for $type"
}

# Create API files for category and tag
create_api_files "category"
create_api_files "tag"

echo "🎉 All API files created successfully!"
