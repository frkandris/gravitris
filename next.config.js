/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/': ['./node_modules/.prisma/client/**/*'],
  },
  // Prevent race condition errors when package.json is read during writes
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules', '**/package.json', '**/package-lock.json'],
      }
    }
    return config
  },
}

module.exports = nextConfig
