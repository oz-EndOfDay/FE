/** @type {import('next').NextConfig} */
const nextConfig = {};

export default {
  nextConfig,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
}