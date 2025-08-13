import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

// Next.js config optimized for AWS Amplify SSR with Strapi integration
export default withVanillaExtract({
  reactStrictMode: true,
  
  // AWS Amplify automatically detects SSR when these are not set
  // No need for output: 'export' - this enables SSR
  
  images: {
    // Enable optimal sizing for both local and remote images
    formats: ['image/avif', 'image/webp'],
    
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
        hostname: 'your-strapi-domain.com', // Replace with your actual Strapi domain
        pathname: '/uploads/**',
      },
    ],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optional: ISR for better performance
  experimental: {
    // Enable if you want to use ISR later
    // incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
  },
}); 