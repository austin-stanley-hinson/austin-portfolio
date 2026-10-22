import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The writeup API reads markdown from content/writeups at request time;
  // ship those files with the function.
  outputFileTracingIncludes: {
    "/api/writeups/[slug]": ["./content/writeups/**/*"],
  },
};

export default nextConfig;
