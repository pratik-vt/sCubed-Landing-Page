<h1 align="center">
 S Cubed Landing Page
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal TypeScript starter.

    ```shell
    # create a new Gatsby site using the minimal TypeScript starter
    npm init gatsby -- -ts
    ```

2.  **Start developing.**

    Navigate into your new site's directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
GATSBY_ADMIN_APP_URL=
GATSBY_ADMIN_APP_API_URL=
GATSBY_APP_ENV=
GATSBY_GTM_ID=
GATSBY_GOOGLE_SITE_VERIFICATION=
GATSBY_CALENDLY_URL=

# Social media links
GATSBY_FACEBOOK_URL=
GATSBY_INSTAGRAM_URL=
GATSBY_YOUTUBE_URL=

# Contact information
GATSBY_PHONE_NUMBER=
GATSBY_EMAIL=
GATSBY_ADDRESS=
```

### Calendly Integration

The "BOOK A DEMO" button now opens a Calendly scheduling popup. You need to:

1. Create a Calendly account if you don't have one
2. Set up your availability and create a scheduling page
3. Update the `GATSBY_CALENDLY_URL` in your `.env` file with your Calendly link

