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
      {protocol: "https", hostname: "freetrials.co.uk"},
      {protocol: "https", hostname: "prod-images-875610838338.s3.eu-central-1.amazonaws.com"},
      {protocol: "https", hostname: "deve-images-686286175224.s3.eu-central-1.amazonaws.com"}


    ],
  },

 
};

export default nextConfig;
