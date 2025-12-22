import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

// Next.js config optimized for AWS Amplify SSR with Strapi integration
export default withVanillaExtract({
  reactStrictMode: true,
  
  // AWS Amplify automatically detects SSR when these are not set
  // No need for output: 'export' - this enables SSR
  
  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression
  
  images: {
    // Enable optimal sizing for both local and remote images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // Cache images for 1 year
    dangerouslyAllowSVG: false, // Security: disable SVG
    
    // Allow external images from Strapi
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev-strapi.scubed.io', // Replace with your actual Strapi domain
        pathname: '/uploads/**',
      },
    ],
  },
  
  // Headers for better performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects for renamed routes
  async redirects() {
    return [
      {
        source: '/features',
        destination: '/practice-management',
        permanent: true,
      },
      {
        source: '/authorization',
        destination: '/aba-authorization-software',
        permanent: true,
      },
      {
        source: '/data-collection',
        destination: '/aba-data-collection-software',
        permanent: true,
      },
      {
        source: '/practice-management',
        destination: '/aba-practice-management-software',
        permanent: true,
      },
      {
        source: '/blog/the-role-of-data-driven-insights-in-improving-aba-therapy-outcomes',
        destination: '/',
        permanent: true,
      }
    ];
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Performance optimizations
  experimental: {
    scrollRestoration: true, // Better scroll behavior
    // Enable if you want to use ISR later
    // incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
}); 