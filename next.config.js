/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/': ['./node_modules/.prisma/client/**/*'],
  },
  // Prevent race condition errors when package.json is read during writes (dev only)
  webpack: (config, { isServer, dev }) => {
    if (!isServer && dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules', '**/package.json', '**/package-lock.json'],
      }
    }
    return config
  },
}

module.exports = nextConfig
