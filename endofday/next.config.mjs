/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*/`,
      },
    ];
  },
  images: {
    domains: ["via.placeholder.com"], // 허용할 도메인 추가
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
