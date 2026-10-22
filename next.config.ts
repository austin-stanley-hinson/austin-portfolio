import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The chapter API reads markdown from content/chapters at request time;
  // ship those files with the function.
  outputFileTracingIncludes: {
    "/api/chapters/[slug]": ["./content/chapters/**/*"],
  },
};

export default nextConfig;
