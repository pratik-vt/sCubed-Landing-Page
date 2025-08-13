# AWS Amplify SSR Deployment Guide

## ✅ **Yes, AWS Amplify Supports Node.js SSR!**

AWS Amplify **fully supports Next.js Server-Side Rendering (SSR)** for dynamic applications like your Strapi-powered blog system.

## 🚀 **Amplify Hosting Types**

### **Option 1: Amplify Hosting (Recommended)**
- ✅ **Full SSR Support** with Node.js runtime
- ✅ **Automatic scaling** and CDN integration
- ✅ **Built-in CI/CD** from GitHub/GitLab
- ✅ **Environment variables** management
- ✅ **Custom domains** and SSL certificates

### **Option 2: Static Export** (Previous setup)
- ❌ **No dynamic content** - static files only
- ❌ **No API routes** or server-side logic
- ✅ **Cheaper** but limited functionality

## 🔧 **Deployment Configuration**

### **1. Amplify Configuration (`amplify.yml`)**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
        - echo "Setting up environment for SSR..."
    build:
      commands:
        - echo "Building Next.js application with SSR support..."
        - npm run build
  artifacts:
    baseDirectory: .next  # Changed from 'out' for SSR
    files:
      - '**/*'
```

### **2. Next.js Configuration**
```javascript
// next.config.mjs
export default {
  // NO output: 'export' - this enables SSR
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-strapi-domain.com',
        pathname: '/uploads/**',
      },
    ],
  },
}
```

## 📋 **Step-by-Step Deployment**

### **Step 1: Prepare Your Repository**
```bash
# Ensure all changes are committed
git add .
git commit -m "Configure for Amplify SSR deployment"
git push origin main
```

### **Step 2: Create Amplify App**
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Connect your **GitHub/GitLab** repository
4. Select the **`scubed-landing-page`** repository
5. Choose **`main`** branch

### **Step 3: Configure Build Settings**
```yaml
# Amplify will auto-detect these settings from amplify.yml
# Verify these match:

Build command: npm run build
Build output directory: .next
Node.js version: 18 (or latest LTS)
```

### **Step 4: Set Environment Variables**
In Amplify Console → **App Settings** → **Environment Variables**:

```bash
# Required for Strapi integration
STRAPI_URL=https://your-strapi-domain.com
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com

# Optional (for protected content)
STRAPI_TOKEN=your_api_token_here

# Optional (for other integrations)
NEXT_PUBLIC_CALENDLY_URL=your_calendly_url
```

### **Step 5: Advanced Settings**
```bash
# Platform: Web
# App framework: Next.js - SSR
# Live package updates: Enabled
# Pull request previews: Enabled (recommended)
```

## 🏗️ **Build Process Explained**

### **What Happens During Deployment:**
1. **Install Dependencies**: `npm ci`
2. **Build Application**: `npm run build`
3. **Create SSR Bundle**: Next.js generates server and client bundles
4. **Deploy to Lambda**: Amplify creates Lambda functions for SSR
5. **Configure CDN**: CloudFront distributes static assets
6. **Set up Routing**: Handles both static and dynamic routes

### **Build Output Structure:**
```
.next/
├── server/          # Server-side code for SSR
├── static/          # Static assets (CSS, JS, images)
├── cache/           # Build cache for faster rebuilds
└── standalone/      # Optimized production bundle
```

## 🔍 **Verification Steps**

### **After Deployment:**
1. **Check Build Logs**: Ensure no errors during build
2. **Test Dynamic Routes**: Visit `/blog/[slug]` URLs
3. **Verify API Calls**: Check Network tab for Strapi requests
4. **Test Performance**: Use Lighthouse for performance audit

### **Common URLs to Test:**
```bash
# Static pages (should work immediately)
https://your-domain.com/
https://your-domain.com/blog

# Dynamic pages (require Strapi)
https://your-domain.com/blog/sample-post
https://your-domain.com/blog/another-article
```

## 🚨 **Troubleshooting**

### **Build Fails:**
```bash
# Check these common issues:
1. Node.js version compatibility
2. Missing environment variables
3. Package.json dependencies
4. TypeScript compilation errors
```

### **Pages Don't Load:**
```bash
# Verify:
1. Strapi CMS is accessible from Amplify
2. CORS settings in Strapi
3. Environment variables are set correctly
4. API endpoints return valid data
```

### **Images Don't Display:**
```bash
# Check:
1. remotePatterns in next.config.mjs
2. Strapi media URLs are publicly accessible
3. HTTPS/HTTP protocol matching
```

## 💰 **Cost Implications**

### **SSR vs Static Hosting:**
- **Static (SSG)**: ~$1-5/month for most sites
- **SSR**: ~$5-20/month (includes compute time)
- **Traffic-based**: Additional costs for high traffic

### **Cost Optimization:**
```javascript
// Optional: Add ISR for better performance/cost balance
export const revalidate = 3600; // Revalidate every hour

// Or implement caching at component level
const CachedBlogListing = React.memo(BlogListing);
```

## 🎯 **Performance Optimization**

### **1. Enable ISR (Incremental Static Regeneration)**
```javascript
// In blog pages
export const revalidate = 3600; // Cache for 1 hour

// Benefits:
// - Reduces server load
// - Improves response times  
// - Maintains dynamic content
```

### **2. Image Optimization**
```javascript
// Already configured in next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [...],
}
```

### **3. Caching Strategy**
```javascript
// Client-side caching for API calls
const SWR_CONFIG = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 300000, // 5 minutes
};
```

## ✅ **Final Checklist**

Before going live:

- [ ] **Strapi CMS** is deployed and accessible
- [ ] **Environment variables** are set in Amplify
- [ ] **Custom domain** is configured (optional)
- [ ] **SSL certificate** is active
- [ ] **Performance testing** completed
- [ ] **Content** is created in Strapi
- [ ] **Error pages** work correctly
- [ ] **Mobile responsiveness** verified

## 🚀 **Ready to Deploy!**

Your blog system is **fully compatible** with AWS Amplify SSR. The configuration is optimized for:

- ✅ **Dynamic content** from Strapi
- ✅ **Server-side rendering** for SEO
- ✅ **Image optimization** for performance
- ✅ **Scalable architecture** for growth

**Deploy with confidence!** 🎉

---

*Need help with deployment? Check the AWS Amplify documentation or contact your development team.* 