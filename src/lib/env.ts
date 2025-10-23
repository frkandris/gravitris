const isNodeRuntime = typeof process !== 'undefined' && !!process.versions?.node

let cachedDatabaseUrl: string | null = null
let envLoaded = false
let hasLoggedResolution = false

function ensureEnvLoaded() {
  if (!isNodeRuntime || envLoaded) return

  try {
    // Lazily require so edge bundles ignore it
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { loadEnvConfig } = require('@next/env') as typeof import('@next/env')
    loadEnvConfig(process.cwd())
    envLoaded = true
  } catch (error) {
    console.warn('[env] Failed to prime environment variables via @next/env', error)
  }
}

function maybeLogResolution(message: string, details: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production' || hasLoggedResolution) return
  console.info(`[env] ${message}`, details)
  hasLoggedResolution = true
}

export function getDatabaseUrl(): string {
  if (cachedDatabaseUrl) {
    return cachedDatabaseUrl
  }

  ensureEnvLoaded()

  const sources: Array<{ value: string | undefined; label: string }> = [
    { value: process.env.POSTGRES_PRISMA_URL, label: 'POSTGRES_PRISMA_URL' },
    { value: process.env.DATABASE_URL, label: 'DATABASE_URL' },
    { value: process.env.POSTGRES_URL, label: 'POSTGRES_URL' },
    { value: process.env.POSTGRES_URL_NON_POOLING, label: 'POSTGRES_URL_NON_POOLING' }
  ]

  let databaseUrl: string | undefined
  let resolvedFrom: string | null = null

  for (const source of sources) {
    if (source.value && source.value.trim().length > 0) {
      databaseUrl = source.value.trim()
      resolvedFrom = source.label
      break
    }
  }

  if (!databaseUrl) {
    throw new Error(
      'Missing database connection string. Set DATABASE_URL (or POSTGRES_PRISMA_URL/POSTGRES_URL_NON_POOLING) in your environment.'
    )
  }

  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = databaseUrl
    resolvedFrom = resolvedFrom ?? 'fallback'
  }

  cachedDatabaseUrl = databaseUrl
  maybeLogResolution('Resolved database URL', {
    resolvedFrom,
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    length: databaseUrl.length,
    preview: databaseUrl.replace(/:[^:@/]+@/, ':***@'),
    sources: sources.map(({ label, value }) => ({
      label,
      present: Boolean(value && value.trim().length > 0)
    }))
  })

  return databaseUrl
}
