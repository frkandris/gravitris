import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'edge'

export async function GET() {
  try {
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
