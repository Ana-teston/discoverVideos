/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY: process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY,
    MAGIC_SECRET_API_KEY:process.env.MAGIC_SECRET_API_KEY,
    NEXT_PUBLIC_HASURA_ADMIN_URL:process.env.HASURA_ADMIN_URL,
    NEXT_PUBLIC_HASURA_ADMIN_SECRET:process.env.HASURA_ADMIN_SECRET
  },
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com"],
  },
};

module.exports = nextConfig;