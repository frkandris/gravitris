import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    await prisma.counter.upsert({
      where: { counterName: 'gamesPlayed' },
      update: {
        counterValue: {
          increment: 1
        }
      },
      create: {
        counterName: 'gamesPlayed',
        counterValue: 1
      }
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error incrementing games played:', error)
    return NextResponse.json(
      { error: 'Failed to increment counter' },
      { status: 500 }
    )
  }
}
