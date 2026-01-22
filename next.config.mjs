/**
 * @fileoverview Next.js Configuration
 * 
 * This configuration file customizes the behavior of the Next.js framework.
 * Next.js uses this file to determine how to build and serve your application.
 * 
 * Key configurations:
 * - Image optimization settings for external image sources
 * - Environment variable handling
 * - Build-time optimizations
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  // This helps identify potential problems in your application
  reactStrictMode: true,
  
  // Configure image optimization
  // This allows Next.js to optimize images from specified domains
  images: {
    // Define allowed remote image patterns for security
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fraudlr.com',
      },
    ],
  },
  
  // Experimental features configuration
  experimental: {
    // Enable server actions for form handling
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
