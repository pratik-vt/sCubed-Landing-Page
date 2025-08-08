import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

// Next.js config with Vanilla Extract support
export default withVanillaExtract({
  reactStrictMode: true,
  output: 'export', // Enable static export for AWS Amplify
  trailingSlash: true, // Required for AWS Amplify static hosting
  images: {
    // Enable optimal sizing for local static imports
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // Required for static export
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}); 