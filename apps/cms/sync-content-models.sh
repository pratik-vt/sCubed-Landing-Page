#!/bin/bash

echo "🔄 Syncing Strapi Content Models..."
echo "=================================="

# Stop any running Strapi instance
echo "📦 Stopping any running Strapi instances..."
pkill -f "strapi develop" || true
sleep 2

# Clear Strapi cache
echo "🧹 Clearing Strapi cache..."
rm -rf .strapi
rm -rf .tmp
rm -rf dist
rm -rf build

# Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

echo "✅ Content models created:"
echo "   - Blog Post (with dynamic zones)"
echo "   - Author"
echo "   - Category" 
echo "   - Tag"
echo "   - 5 Content Components:"
echo "     • TextModule"
echo "     • ModuleImage"
echo "     • ModuleQuote"
echo "     • ModuleYoutube"
echo "     • ModuleAudio"

echo ""
echo "🚀 Starting Strapi..."
echo "The admin panel will be available at: http://localhost:1337/admin"
echo "Please create your first admin user when prompted."
echo ""

# Start Strapi in development mode
npm run develop 