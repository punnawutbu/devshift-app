/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["devshift.dev", "localhost"],
  },
};

module.exports = nextConfig;
