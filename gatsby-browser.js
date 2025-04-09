// Get GTM ID from environment variable
const gtmId = process.env.GATSBY_GTM_ID;

// Google Analytics implementation for client-side
export const onClientEntry = () => {
  // Skip during SSR
  if (typeof window === 'undefined') {
    return;
  }

  // gtag function definition moved to module scope
  function gtag() {
    window.dataLayer.push(arguments);
  }

  // Add Google Analytics to the window
  const addGoogleAnalytics = () => {
    // Add script to the document only if it doesn't exist
    if (!document.getElementById('google-analytics-script')) {
      // Load gtag.js script
      const gtagScript = document.createElement('script');
      gtagScript.id = 'google-analytics-script';
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gtmId}`;
      document.head.appendChild(gtagScript);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.dataLayer = window.dataLayer || [];
      gtag('js', new Date());
      gtag('config', gtmId);

      // Make gtag available globally
      window.gtag = gtag;
    }
  };

  // Add the scripts when the window loads
  if (process.env.GATSBY_APP_ENV === 'prod') {
    addGoogleAnalytics();
  }
};

// Track page views on client-side route changes
export const onRouteUpdate = ({ location }) => {
  if (typeof window?.gtag === 'function') {
    window.gtag('config', gtmId, {
      page_path: location.pathname,
    });
  }
};
