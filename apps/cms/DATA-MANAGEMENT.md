# S Cubed CMS - Data Management

Clean and working data management tools for your Strapi CMS.

## 🧹 **Cleaned Up!**

Removed all non-working seed scripts and kept only the functional tools:

## 📁 **Available Tools**

### ✅ **Working Files:**

1. **`export-import-data.js`** - Official Strapi export/import tool
   - Uses Strapi's built-in data management commands
   - Reliable backup and restore functionality
   - Based on official documentation

2. **`create-sample-data.js`** - JSON sample data generator
   - Creates structured JSON files for manual import
   - Safe approach that doesn't modify existing data

3. **`add-sample-content.md`** - Step-by-step manual guide
   - Detailed instructions for adding sample content via admin panel
   - Preserves existing data while adding new content
   - Recommended approach

4. **`sample-data/`** - Generated JSON files
   - Ready-to-use sample data
   - Authors, categories, tags, and blog posts
   - Can be copy-pasted into admin panel

## 🚀 **Quick Commands**

```bash
# Export current data (creates backup)
npm run data:export

# List available backups
npm run data:list

# Import from a backup file
npm run data:import <file-path>

# Generate fresh sample data JSON files
npm run data:sample
```

## 🎯 **Recommended Workflow**

1. **Backup first**: `npm run data:export`
2. **Add sample content**: Follow `add-sample-content.md` guide
3. **Use admin panel**: http://localhost:1337/admin
4. **Import existing data safely** without losing your current content

## 📊 **Current Status**

- ✅ Your data is safely backed up
- ✅ Sample content ready to add
- ✅ Multiple import methods available
- ✅ No risk of data loss

## 🗑️ **Removed (Non-Working)**

- ❌ `import-dummy-data.js` - Complex, didn't work
- ❌ `seed-data.js` - Import issues
- ❌ `seed-api.js` - Authentication problems  
- ❌ `quick-seed.js` - Loading issues
- ❌ `scripts/seed.js` - Strapi compatibility issues
- ❌ `README-SEEDING.md` - Outdated documentation

## 📖 **Documentation**

All tools are based on:
- [Strapi Data Management](https://docs.strapi.io/cms/data-management/import)
- Official export/import commands
- Best practices for data safety 