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

  const baseKeys = [
    'POSTGRES_PRISMA_URL',
    'DATABASE_URL',
    'POSTGRES_URL',
    'POSTGRES_URL_NON_POOLING'
  ] as const

  function resolveEnv(key: typeof baseKeys[number]) {
    const direct = process.env[key]
    if (direct && direct.trim().length > 0) {
      return { value: direct.trim(), label: key }
    }

    const prefixedKey = Object.keys(process.env).find((envKey) => {
      if (!envKey || typeof envKey !== 'string') return false
      if (envKey === key) return false
      return envKey.toUpperCase().endsWith(`_${key}`)
    })

    if (prefixedKey) {
      const value = process.env[prefixedKey]
      if (value && value.trim().length > 0) {
        return { value: value.trim(), label: prefixedKey }
      }
    }

    return { value: undefined, label: key }
  }

  const sources = baseKeys.map((key) => resolveEnv(key))

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
