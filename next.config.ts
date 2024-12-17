import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.hellomagazine.com", "lh3.googleusercontent.com",'images.pexels.com'], // Add the external domain here
    remotePatterns: []
  },
};

export default nextConfig;
