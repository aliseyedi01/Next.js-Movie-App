/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "moviesapi.ir",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
