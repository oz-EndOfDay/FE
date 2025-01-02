/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["via.placeholder.com"], // 허용할 도메인 추가
    },
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
};

export default nextConfig;
