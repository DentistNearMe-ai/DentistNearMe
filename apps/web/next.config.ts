import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeCss: false, // Add this line to disable CSS optimization
    turbo: {
      rules: {
        '*.tsx': {
          loaders: ['@vercel/webpack-loader'],
        },
      },
    },
  },
};

export default nextConfig;