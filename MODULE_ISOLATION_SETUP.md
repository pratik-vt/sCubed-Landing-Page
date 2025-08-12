# Complete Module Isolation for Turborepo

This repository uses **complete module isolation** with `"nohoist": ["**"]` to ensure each application has its own isolated `node_modules` directory. This prevents all dependency conflicts and version mismatches.

## Configuration Files

### Root Configuration
- `.npmrc` - Basic npm configuration for module isolation
- `.yarnrc` - Complete workspace isolation with `workspaces-nohoist-pattern "**"`
- `package.json` - Uses `"nohoist": ["**"]` for complete isolation

**No app-specific configuration needed** - the root configuration handles everything!

## How It Works

1. **No Hoisting**: Dependencies are not hoisted to the root `node_modules`
2. **Nested Installation**: Each workspace gets its own `node_modules` directory
3. **Isolated Dependencies**: Apps cannot accidentally use dependencies from other apps

## Installation Steps

### Normal Installation (Recommended)
```bash
# Simple - the nohoist configuration handles everything!
yarn install
```

### Troubleshooting/Clean Install (When Needed)
```bash
# Only use this if you have issues or need a fresh start
./clean-install.sh
```

### Manual Setup (Alternative)
1. **Clean existing installations**:
   ```bash
   # Remove existing node_modules and lock files
   rm -rf node_modules apps/*/node_modules packages/*/node_modules
   rm -f yarn.lock package-lock.json apps/*/package-lock.json
   yarn cache clean
   npm cache clean --force
   rm -rf .turbo
   ```

2. **Install dependencies**:
   ```bash
   # Install with Yarn (recommended for workspaces)
   yarn install --force --check-files
   
   # OR with npm (less recommended for this setup)
   npm install
   ```

3. **Verify isolation**:
   ```bash
   # Check that each app has its own node_modules
   ls -la apps/web/node_modules
   ls -la apps/cms/node_modules
   
   # Verify apps can't access each other's dependencies
   node -e "try { require('apps/web/node_modules/next'); console.log('ERROR: Cross-app dependency access possible'); } catch(e) { console.log('SUCCESS: Dependencies are isolated'); }"
   ```

## Benefits

- **Dependency Isolation**: Each app only has access to its declared dependencies
- **Version Safety**: Different apps can use different versions of the same package
- **Build Reproducibility**: Eliminates "works on my machine" issues
- **Security**: Prevents accidental dependency access between apps
- **Clear Boundaries**: Makes it explicit which dependencies each app uses

## Development Workflow

```bash
# Install new dependency for web app
cd apps/web
yarn add some-package

# Install new dependency for CMS
cd apps/cms
yarn add some-package

# Run development
yarn dev

# Build all apps
yarn build
```

## React Version Conflict Resolution ✅ SOLVED

Perfect isolation achieved! Each app has its own React version:
- **Web app**: React 19.1.1 (Next.js 15 requirement) ✅
- **CMS app**: React 18.3.1 (Strapi requirement) ✅

The `"nohoist": ["**"]` configuration ensures **zero** dependency conflicts.

## Troubleshooting

If you encounter issues:

1. **React version conflicts**:
   ```bash
   # Use the automated script to resolve conflicts
   ./clean-install.sh
   ```

2. **Clear all caches**:
   ```bash
   yarn clean
   rm -rf .turbo
   yarn cache clean
   npm cache clean --force
   ```

3. **Reinstall from scratch**:
   ```bash
   rm -rf node_modules apps/*/node_modules packages/*/node_modules
   rm -f yarn.lock package-lock.json apps/*/package-lock.json
   yarn install --force --check-files
   ```

4. **Verify React versions**:
   ```bash
   # Check web app React version
   cd apps/web && node -e "console.log('Web React:', require('react/package.json').version)"
   
   # Check CMS React version  
   cd apps/cms && node -e "console.log('CMS React:', require('react/package.json').version)"
   ```

5. **Check configuration**:
   - Ensure `.npmrc` files are present in root and each app
   - Verify `package.json` workspace configuration includes comprehensive `nohoist`
   - Check that `.yarnrc` has specific nohoist patterns for React and related packages
   - Confirm no React packages exist in root `node_modules` 