import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const prisma = await getPrisma()
    const [linesCleared, gamesPlayed] = await Promise.all([
      prisma.counter.findUnique({
        where: { counterName: 'linesCleared' }
      }),
      prisma.counter.findUnique({
        where: { counterName: 'gamesPlayed' }
      })
    ])

    return NextResponse.json({
      linesCleared: linesCleared?.counterValue || 0,
      gamesPlayed: gamesPlayed?.counterValue || 0
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
