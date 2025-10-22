import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gameString, gameBlocks, playerName, gameLevel, points } = body

    if (!gameString || !gameBlocks || !playerName || gameLevel === undefined || points === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const gameRecording = await prisma.gameRecording.create({
      data: {
        gameString,
        gameBlocks,
        playerName,
        gameLevel,
        points,
        gameDate: new Date()
      }
    })

    return NextResponse.json({ id: gameRecording.id }, { status: 200 })
  } catch (error) {
    console.error('Error saving game:', error)
    return NextResponse.json(
      { error: 'Failed to save game' },
      { status: 500 }
    )
  }
}
