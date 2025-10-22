/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-neon', '@neondatabase/serverless'],
}

module.exports = nextConfig
