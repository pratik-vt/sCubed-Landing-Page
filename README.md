<h1 align="center">
 S Cubed Landing Page
</h1>

## 🚀 Quick start

1.  **Clone the repository.**

    ```shell
    git clone <repository-url>
    cd scubed-landing-page
    ```

2.  **Install dependencies.**

    ```shell
    npm install
    # or
    yarn install
    ```

3.  **Start developing.**

    Navigate into your site's directory and start the development server.

    ```shell
    npm run dev
    # or
    yarn dev
    ```

4.  **Open the code and start customizing!**

    Your site is now running at http://localhost:3000!

    Edit `src/app/page.tsx` to see your site update in real-time!

## 📦 Build and Deploy

```shell
# Build for production
npm run build
# or
yarn build

# Start production server
npm run start
# or
yarn start
```

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

