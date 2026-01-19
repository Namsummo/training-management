// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "vitex.duckdns.org",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
