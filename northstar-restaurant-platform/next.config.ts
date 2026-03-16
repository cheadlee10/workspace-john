import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't expose source maps in production (prevents source code leaking)
  productionBrowserSourceMaps: false,
  // Reduce build memory usage for environments with limited RAM
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "staticmap.openstreetmap.de",
      },
      {
        protocol: "https",
        hostname: "www.openstreetmap.org",
      },
    ],
  },
};

export default nextConfig;
