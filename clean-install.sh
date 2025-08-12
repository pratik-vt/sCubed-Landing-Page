#!/bin/bash

echo "🧹 Clean install with complete module isolation..."
echo "ℹ️  Note: With nohoist=[\"**\"], this is only needed for troubleshooting"
echo ""

# Remove all node_modules and caches
rm -rf node_modules apps/*/node_modules packages/*/node_modules
rm -f yarn.lock package-lock.json apps/*/package-lock.json packages/*/package-lock.json
yarn cache clean >/dev/null 2>&1
npm cache clean --force >/dev/null 2>&1
rm -rf .turbo

echo "✅ Cleanup complete!"

# Install dependencies
echo "📦 Installing with complete isolation..."
yarn install

# Quick verification
echo ""
echo "🔍 Verification:"
echo "📊 Web React: $(cd apps/web && node -e "console.log(require('react/package.json').version)" 2>/dev/null)"
echo "📊 CMS React: $(cd apps/cms && node -e "console.log(require('react/package.json').version)" 2>/dev/null)"
echo "📦 Root modules: $(ls node_modules/ 2>/dev/null | wc -l) (should be minimal)"
echo "📦 Web modules: $(ls apps/web/node_modules/ 2>/dev/null | wc -l)" 
echo "📦 CMS modules: $(ls apps/cms/node_modules/ 2>/dev/null | wc -l)"

echo ""
echo "🎉 Complete isolation setup verified!"
echo "💡 Normal workflow: just use 'yarn install' - no script needed" 