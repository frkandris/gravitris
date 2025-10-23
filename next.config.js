/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracing: true,
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/.prisma/client/**/*'],
      '/': ['./node_modules/.prisma/client/**/*'],
    },
  },
}

module.exports = nextConfig
