import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ count: string }> }
) {
  try {
    const { count } = await params
    const numberOfLinesCleared = Number(count)
    
    if (isNaN(numberOfLinesCleared)) {
      return NextResponse.json(
        { error: 'Invalid number received from client' },
        { status: 400 }
      )
    }
    
    if (numberOfLinesCleared > 30) {
      return NextResponse.json(
        { error: 'Number greater than 30 received from client' },
        { status: 400 }
      )
    }

    const prisma = getPrisma()
    await prisma.counter.upsert({
      where: { counterName: 'linesCleared' },
      update: {
        counterValue: {
          increment: numberOfLinesCleared
        }
      },
      create: {
        counterName: 'linesCleared',
        counterValue: numberOfLinesCleared
      }
    })

    console.log(`Counter increased by ${numberOfLinesCleared}`)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error increasing counter:', error)
    return NextResponse.json(
      { error: 'Failed to increase counter' },
      { status: 500 }
    )
  }
}
