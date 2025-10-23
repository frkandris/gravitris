import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { generateRandomName } from '@/lib/nameGenerator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    let { gameString, gameBlocks, playerName, gameLevel, points } = body

    if (!gameString || !gameBlocks || gameLevel === undefined || points === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Ensure playerName is never empty - fallback to generated name
    if (!playerName || !playerName.trim()) {
      playerName = generateRandomName()
    }

    const prisma = getPrisma()
    const gameRecording = await prisma.gameRecording.create({
      data: {
        gameString,
        gameBlocks,
        playerName: playerName.trim(),
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
