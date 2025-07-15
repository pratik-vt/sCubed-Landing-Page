# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

S Cubed Landing Page - A Gatsby-based marketing site for practice management software serving therapy practices. Built with TypeScript, React, and Vanilla Extract CSS-in-JS.

## Essential Commands

```bash
# Development
yarn develop     # Start dev server at http://localhost:8000
yarn start       # Alias for develop

# Build & Deploy
yarn build       # Production build
yarn serve       # Serve production build locally
yarn clean       # Clean cache and public directories

# Code Quality
yarn typecheck   # Run TypeScript type checking
yarn lint        # Run ESLint
yarn lint:fix    # Fix linting issues
```

## Architecture Overview

### Technology Stack
- **Framework**: Gatsby v5.13.0 with React 18.3.1
- **Language**: TypeScript with strict mode
- **Styling**: Vanilla Extract CSS-in-JS (type-safe styling)
- **Forms**: React Hook Form with validator.js
- **Key Integrations**: Calendly widget, Google Tag Manager

### Project Structure
```
src/
├── components/     # Reusable UI components (all TypeScript)
├── hooks/          # Custom React hooks
├── images/         # Static assets
└── pages/          # Gatsby pages (index, 404, privacy, terms)
```

### Component Architecture
- Each component has its own directory with `index.tsx` and `*.css.ts` files
- Container component applies global styles and wraps all pages
- Layout component handles page structure with Header/Footer
- All components use TypeScript interfaces for props

### Styling Approach
- Vanilla Extract for CSS-in-JS with type safety
- Responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Media queries defined in individual component style files
- Global styles applied through Container component

## Environment Configuration

Required `.env` variables:
```
GATSBY_ADMIN_APP_URL
GATSBY_ADMIN_APP_API_URL
GATSBY_APP_ENV              # dev/stage/prod
GATSBY_GTM_ID               # Google Tag Manager ID
GATSBY_GOOGLE_SITE_VERIFICATION
GATSBY_CALENDLY_URL         # Calendly scheduling link
GATSBY_FACEBOOK_URL
GATSBY_INSTAGRAM_URL
GATSBY_YOUTUBE_URL
GATSBY_PHONE_NUMBER
GATSBY_EMAIL
GATSBY_ADDRESS
```

## Key Implementation Details

### SEO & Analytics
- SEO component in every page with meta tags
- Robots meta tag: `noindex` for non-prod, `index` for prod
- Google Tag Manager only loads in production (`GATSBY_APP_ENV === 'prod'`)
- GTM hardcoded ID: GTM-WFFCJJSB in gatsby-ssr.js

### Forms & Modals
- ModalForm component handles contact form with validation
- Phone number formatting with react-input-mask
- Form submission posts to `GATSBY_ADMIN_APP_API_URL/api/website/contact-us`

### Calendly Integration
- CalendlyWidget component opens scheduling popup
- Requires `GATSBY_CALENDLY_URL` environment variable
- Used in Hero and Header components for demo booking

### Deployment
- S3 deployment configured via gatsby-plugin-s3
- Build outputs to `public/` directory
- Static site with client-side routing

## Development Guidelines

### TypeScript
- Strict mode enabled - all code must be properly typed
- Avoid `any` types - use proper interfaces
- Component props must have TypeScript interfaces

### Code Style
- ESLint with TypeScript and React rules
- Prettier formatting (single quotes, trailing commas)
- Import order enforced by ESLint

### Component Patterns
- Functional components with hooks (no class components)
- Props interfaces defined above components
- Vanilla Extract styles in separate `.css.ts` files
- Responsive design handled within component styles