import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Read the HTML file from the public directory
    const htmlPath = join(process.cwd(), 'public', 'lp', 'index.html');
    let htmlContent = await readFile(htmlPath, 'utf-8');
    
    // Get reCAPTCHA site key from environment variables
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3;
    
    // Fix relative image paths to point to /lp/images/
    htmlContent = htmlContent.replace(/src="\.\/images\//g, 'src="/lp/images/');
    htmlContent = htmlContent.replace(/href="\.\/images\//g, 'href="/lp/images/');
    
    // Fix any other relative asset paths
    htmlContent = htmlContent.replace(/src="\.\/([^"]*\.(css|js))"/g, 'src="/lp/$1"');
    htmlContent = htmlContent.replace(/href="\.\/([^"]*\.css)"/g, 'href="/lp/$1"');
    
    // Inject reCAPTCHA configuration if available
    // This allows server-side management of reCAPTCHA keys via environment variables
    if (recaptchaSiteKey) {
      // Enable reCAPTCHA script by uncommenting it
      htmlContent = htmlContent.replace(
        /<!-- <script src="https:\/\/www\.google\.com\/recaptcha\/api\.js\?render=explicit" async defer><\/script> -->/g,
        `<script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>`
      );
      
      // Inject reCAPTCHA site key into JavaScript configuration
      htmlContent = htmlContent.replace(
        /window\.RECAPTCHA_SITE_KEY = null;/g,
        `window.RECAPTCHA_SITE_KEY = '${recaptchaSiteKey}';`
      );
    }
    
    // Add noindex meta tag to head if not present
    if (!htmlContent.includes('robots')) {
      htmlContent = htmlContent.replace(
        /<head([^>]*)>/i, 
        '<head$1>\n    <meta name="robots" content="noindex, nofollow">'
      );
    }
    
    return new Response(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    console.error('Error reading HTML file:', error);
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <meta name="robots" content="noindex, nofollow">
        </head>
        <body>
          <h1>Error Loading Page</h1>
          <p>The requested page could not be loaded.</p>
        </body>
      </html>`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  }
}
