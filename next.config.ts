import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {

    remotePatterns: [
      {
        protocol: "https",
        hostname: "nbrdqfucz2.ufs.sh",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "another-host.com",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
