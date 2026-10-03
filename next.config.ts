import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // Allow cache-busting query strings (e.g. /images/avatar-m2.jpg?v=2)
    // on local images; omitting `search` permits any query.
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
