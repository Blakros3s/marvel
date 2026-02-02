import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove output: 'export' for PM2 server mode
  // output: 'export',
  // distDir: 'dist',
  
  images: {
    unoptimized: false, // Can use Next.js image optimization in server mode
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // For production
  reactStrictMode: true,
};

export default nextConfig;
