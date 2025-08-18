# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

S Cubed Monorepo - A Turborepo-based monorepo containing a Next.js 15 landing page and Strapi v5 CMS for practice management software serving therapy practices.

## Essential Commands

### Monorepo Commands
```bash
# Development
yarn dev           # Start all apps (web + cms)
yarn dev:web       # Start Next.js only
yarn dev:cms       # Start Strapi only

# Build & Deploy
yarn build         # Build all apps
yarn build:web     # Build Next.js only
yarn build:cms     # Build Strapi only

# Code Quality (runs across all apps)
yarn typecheck     # TypeScript type checking
yarn lint          # ESLint checks
yarn clean         # Clean all build artifacts
yarn format        # Format code with Prettier
```

### Web App Commands (apps/web)
```bash
cd apps/web
yarn dev           # Dev server at http://localhost:3000
yarn build         # Production build (SSR-ready)
yarn start         # Start production server
yarn lint:fix      # Fix linting issues
```

### CMS Commands (apps/cms)
```bash
cd apps/cms
yarn dev           # Strapi dev at http://localhost:1337
yarn build         # Build admin panel
yarn start         # Production server
yarn data:export   # Export content data
yarn data:import   # Import content data
yarn data:sample   # Create sample data
```

## Architecture Overview

### Monorepo Structure
```
scubed-monorepo/
├── apps/
│   ├── web/       # Next.js 15 landing page
│   └── cms/       # Strapi v5 CMS
├── packages/      # Shared packages
└── turbo.json     # Turborepo configuration
```

### Technology Stack
- **Monorepo**: Turborepo with Yarn workspaces
- **Web**: Next.js 15 (App Router), TypeScript, Vanilla Extract CSS
- **CMS**: Strapi v5, TypeScript, SQLite/PostgreSQL
- **Deployment**: AWS Amplify (SSR), GitLab CI/CD

### Next.js Architecture (apps/web)
- App Router with Server Components by default
- Vanilla Extract for type-safe CSS-in-JS
- Component structure: `components/[ComponentName]/index.tsx` + `styles.css.ts`
- TypeScript strict mode enabled
- Path alias: `@/*` maps to `src/*`

### Strapi Configuration (apps/cms)
- Content types: blog-post, author, category, tag, contact-submission
- API endpoints under `/api/[content-type]`
- PostgreSQL for production, SQLite for development
- Custom data management scripts for export/import

## Environment Configuration

### Web App (.env.local)
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_ADMIN_APP_URL=
NEXT_PUBLIC_ADMIN_APP_API_URL=
NEXT_PUBLIC_APP_ENV=dev              # dev/stage/prod
NEXT_PUBLIC_GTM_ID=                  # Google Tag Manager
NEXT_PUBLIC_CALENDLY_URL=             # Calendly scheduling
NEXT_PUBLIC_SITE_URL=
# Social & Contact
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_YOUTUBE_URL=
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_EMAIL=
NEXT_PUBLIC_ADDRESS=
```

### CMS (.env)
```bash
DATABASE_URL=                         # PostgreSQL connection
STRAPI_ADMIN_JWT_SECRET=
HOST=0.0.0.0
PORT=1337
```

## Key Implementation Details

### Blog Integration
- Dynamic blog pages at `/blog/[slug]`
- Fetches content from Strapi CMS
- Rich content modules: text, image, quote, audio, YouTube
- Server-side rendering for SEO

### Component Patterns
- Server Components by default, Client Components with "use client"
- Vanilla Extract styles in `.css.ts` files
- TypeScript interfaces for all component props
- Responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)

### Forms & Integrations
- ModalForm for contact forms with validation
- Calendly integration via CalendlyWidget component
- Form submissions to admin API endpoint

### Deployment Pipeline
- AWS Amplify for Next.js (SSR enabled)
- GitLab CI/CD with Turborepo caching
- Selective deployment based on changed files
- Environments: dev, staging, production

## Development Guidelines

### TypeScript
- Strict mode enforced in both apps
- No `any` types - use proper interfaces
- Path imports using `@/` alias in web app

### Styling (Web App)
- All styles in Vanilla Extract `.css.ts` files
- Use design tokens from `src/styles/tokens.css.ts`
- Co-locate styles with components
- Responsive design within component styles

### Testing & Validation
```bash
# Before committing
yarn typecheck     # Must pass with no errors
yarn lint          # Must pass with no errors
yarn build         # Must build successfully
```

### Git Workflow
- Feature branches from `develop`
- Main branch for production: `develop`
- Run quality checks before committing
- Follow conventional commit messages

## Common Tasks

### Adding a New Page (Web)
1. Create page in `apps/web/src/app/[page-name]/page.tsx`
2. Add metadata for SEO
3. Use Layout component for consistent structure
4. Test with `yarn build` for SSR compatibility

### Adding Blog Content (CMS)
1. Start CMS: `yarn dev:cms`
2. Access admin at http://localhost:1337/admin
3. Create content in Blog Posts section
4. Content available via API at `/api/blog-posts`

### Updating Environment Variables
1. Update `.env.local` (web) or `.env` (cms)
2. Prefix with `NEXT_PUBLIC_` for client-side access in Next.js
3. Restart development servers
4. Update Amplify Console for production

### Troubleshooting Builds
- Clear caches: `yarn clean`
- Reinstall dependencies: `rm -rf node_modules && yarn install`
- Check TypeScript: `yarn typecheck`
- Verify environment variables are set correctly