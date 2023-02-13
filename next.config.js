/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"],
  },
};

module.exports = nextConfig;