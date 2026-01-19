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

export default nextConfig;
