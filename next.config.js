/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/': ['./node_modules/.prisma/client/**/*'],
  },
}

module.exports = nextConfig
