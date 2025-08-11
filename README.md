# S Cubed Monorepo

This is a Turborepo monorepo containing the S Cubed landing page (Next.js) and CMS (Strapi).

## 📁 Structure

```
scubed-monorepo/
├── apps/
│   ├── web/           # Next.js 15 landing page
│   └── cms/           # Strapi v5 CMS
├── packages/
│   ├── config/        # Shared configurations
│   └── types/         # Shared TypeScript types
├── turbo.json         # Turborepo configuration
├── package.json       # Root package.json
└── .gitlab-ci.yml     # GitLab CI/CD pipeline
```

## 🚀 Quick start

### Prerequisites

- Node.js 18+
- Yarn 1.22.22+

### Installation

```bash
# Install dependencies
yarn install

# Run all apps in development
yarn dev

# Run specific app
yarn dev:web    # Next.js only
yarn dev:cms    # Strapi only
```

## 📦 Apps

### Web (Next.js)

The main landing page built with:
- Next.js 15 with App Router
- TypeScript
- Vanilla Extract CSS
- Static export for AWS Amplify

```bash
cd apps/web
yarn dev        # Start development server
yarn build      # Build for production
yarn start      # Start production server
```

### CMS (Strapi)

Headless CMS for managing content:
- Strapi v5
- TypeScript
- SQLite (development)
- PostgreSQL (production)

```bash
cd apps/cms
yarn dev        # Start development server
yarn build      # Build admin panel
yarn start      # Start production server
```

## 🏗️ Building

```bash
# Build all apps
yarn build

# Build specific app
yarn build:web
yarn build:cms

# Type checking
yarn typecheck

# Linting
yarn lint
```

## 🚢 Deployment

### Next.js → AWS Amplify
- Automatic static export
- Deployed via GitLab CI
- Environments: dev, staging, production

### Strapi → AWS (Options)
1. **ECS Fargate** (Recommended)
   - Containerized deployment
   - Auto-scaling
   - RDS PostgreSQL

2. **EC2 with PM2**
   - Traditional deployment
   - Manual scaling
   - RDS PostgreSQL

3. **AWS App Runner**
   - Simplified deployment
   - Automatic scaling
   - RDS PostgreSQL

## 🔧 Environment Variables

### Next.js (`apps/web/.env.local`)
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# ... other existing env vars
```

### Strapi (`apps/cms/.env`)
```env
DATABASE_URL=postgres://user:password@host:5432/database
STRAPI_ADMIN_JWT_SECRET=your-secret
# ... other Strapi env vars
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start all apps in development |
| `yarn build` | Build all apps |
| `yarn lint` | Lint all apps |
| `yarn clean` | Clean all build artifacts |
| `yarn typecheck` | Run TypeScript checks |

## 🔄 GitLab CI/CD

The pipeline includes:
- **Sonar** analysis
- **Build** stage with Turborepo caching
- **Deploy** stages for each app/environment
- Selective deployment based on changed files

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Run `yarn lint` and `yarn typecheck`
4. Submit a merge request

## 📄 License

Private - All rights reserved

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_ADMIN_APP_URL=
NEXT_PUBLIC_ADMIN_APP_API_URL=
NEXT_PUBLIC_APP_ENV=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_CALENDLY_URL=
NEXT_PUBLIC_SITE_URL=

# Social media links
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_YOUTUBE_URL=

# Contact information
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_EMAIL=
NEXT_PUBLIC_ADDRESS=
```

### Calendly Integration

The "BOOK A DEMO" button now opens a Calendly scheduling popup. You need to:

1. Create a Calendly account if you don't have one
2. Set up your availability and create a scheduling page
3. Update the `NEXT_PUBLIC_CALENDLY_URL` in your `.env.local` file with your Calendly link

## 🛠️ Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Vanilla Extract** - CSS-in-JS styling
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Home page
│   ├── layout.tsx      # Root layout
│   ├── billing/        # Billing page
│   ├── features/       # Features page
│   └── ...
├── components/         # Reusable React components
├── images/            # Static images
└── styles/            # Global styles and tokens
```

