import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'
import { getDatabaseUrl } from '@/lib/env'

const isNode = typeof process !== 'undefined' && process.versions?.node

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaPromise: Promise<PrismaClient> | undefined
}

async function createPrismaClient(): Promise<PrismaClient> {
  if (isNode) {
    const wsModule = await import('ws')
    neonConfig.webSocketConstructor = wsModule.default ?? wsModule
  } else if (typeof WebSocket !== 'undefined') {
    neonConfig.webSocketConstructor = WebSocket
  }

  const databaseUrl = getDatabaseUrl()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined')
  }

  if (process.env.NODE_ENV !== 'production') {
    const redacted = databaseUrl.replace(/:[^:@/]+@/, ':***@')
    console.info('[prisma] Initializing Neon adapter', { databaseUrl: redacted, runtime: isNode ? 'node' : 'edge' })
  }

  const adapter = new PrismaNeon({
    connectionString: databaseUrl
  })
  const client = new PrismaClient({
    adapter
  } as any)

  return client
}

export async function getPrisma(): Promise<PrismaClient> {
  if (globalForPrisma.prisma) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[prisma] Reusing existing Prisma client')
    }
    return globalForPrisma.prisma
  }

  if (!globalForPrisma.prismaPromise) {
    globalForPrisma.prismaPromise = createPrismaClient().then(client => {
      if (process.env.NODE_ENV !== 'production') {
        console.info('[prisma] Prisma client ready')
        globalForPrisma.prisma = client
      }
      return client
    })
  }

  return globalForPrisma.prismaPromise
}
