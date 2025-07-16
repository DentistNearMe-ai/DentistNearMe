import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
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
