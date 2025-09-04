import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "nbrdqfucz2.ufs.sh", pathname: "/**" },
      { protocol: "https", hostname: "another-host.com", pathname: "/**" },
    ],
  },

  // Turbopack-specific config (dev only)
  turbopack: {
    resolveAlias: {
      // Example: map 'underscore' to 'lodash'
      underscore: "lodash",
    },
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
    moduleIds: "named", // optional: named vs deterministic
    // memoryLimit: 1073741824, // optional: 1GB memory limit
  },
};

export default nextConfig;
