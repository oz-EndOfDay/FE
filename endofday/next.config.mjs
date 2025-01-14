/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"], // 허용할 도메인 추가
    domains: ["eod-be.s3.ap-northeast-2.amazonaws.com"], // S3 도메인 추가 (일기 상세조회)
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
