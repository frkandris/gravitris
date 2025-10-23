let cachedDatabaseUrl: string | null = null

export function getDatabaseUrl(): string {
  if (cachedDatabaseUrl) {
    return cachedDatabaseUrl
  }

  // Check standard env vars and prefixed variants (for Vercel)
  const envKeys = [
    'POSTGRES_PRISMA_URL',
    'DATABASE_URL',
    'POSTGRES_URL',
    'POSTGRES_URL_NON_POOLING'
  ]

  for (const key of envKeys) {
    // Check direct env var
    let value = process.env[key]
    if (value?.trim()) {
      cachedDatabaseUrl = value.trim()
      return cachedDatabaseUrl
    }

    // Check prefixed env var (e.g., gravitris_DATABASE_URL)
    const prefixedKey = Object.keys(process.env).find(
      (envKey) => envKey?.toUpperCase().endsWith(`_${key}`)
    )
    
    if (prefixedKey) {
      value = process.env[prefixedKey]
      if (value?.trim()) {
        cachedDatabaseUrl = value.trim()
        // Set DATABASE_URL for Prisma
        if (!process.env.DATABASE_URL) {
          process.env.DATABASE_URL = cachedDatabaseUrl
        }
        return cachedDatabaseUrl
      }
    }
  }

  throw new Error(
    'Missing database connection string. Set DATABASE_URL or POSTGRES_PRISMA_URL in your environment.'
  )
}
