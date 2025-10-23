import { PrismaClient } from '@prisma/client'
import { getDatabaseUrl } from '@/lib/env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = getDatabaseUrl()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined')
  }

  if (process.env.NODE_ENV !== 'production') {
    const redacted = databaseUrl.replace(/:[^:@/]+@/, ':***@')
    console.info('[prisma] Creating Prisma client', { databaseUrl: redacted })
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  })
}

export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }

  globalForPrisma.prisma = createPrismaClient()
  
  if (process.env.NODE_ENV !== 'production') {
    console.info('[prisma] Prisma client ready')
  }

  return globalForPrisma.prisma
}
