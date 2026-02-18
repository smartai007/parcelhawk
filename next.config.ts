import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.land.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
