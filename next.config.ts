import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "assets.thisisbud.com",
      },
      { protocol: "https", hostname: "ui.awin.com" },
    ],
  },
};

export default nextConfig;
