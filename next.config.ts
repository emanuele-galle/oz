import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/zoe-cristofoli',
        permanent: true,
      },
      {
        source: '/il-brand/storia',
        destination: '/zoe-cristofoli',
        permanent: true,
      },
      {
        source: '/il-brand/processo',
        destination: '/il-brand/filosofia',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
