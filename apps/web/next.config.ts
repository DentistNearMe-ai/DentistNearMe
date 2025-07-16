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
    // ← turns OFF Turbopack everywhere (dev + build)
    turbo: false
  },
};

export default nextConfig;
