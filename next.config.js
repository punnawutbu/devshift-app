/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['devshift.dev', 'http://localhost:3000/'],
    },
  };
  
  module.exports = nextConfig;
  