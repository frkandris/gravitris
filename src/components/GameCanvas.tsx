'use client'

import { useEffect, useRef } from 'react'

interface GameCanvasProps {
  replayMode?: boolean
  gameBlocks?: number[]
  gameString?: any
}

export default function GameCanvas({ replayMode = false, gameBlocks, gameString }: GameCanvasProps) {
  const nextBlocksCanvasRef = useRef<HTMLCanvasElement>(null)
  const playAreaCanvasRef = useRef<HTMLCanvasElement>(null)
  const gravityCanvasRef = useRef<HTMLCanvasElement>(null)
  const gameInitialized = useRef(false)

  useEffect(() => {
    if (gameInitialized.current) return
    gameInitialized.current = true

    // Set replay mode variables if needed
    if (replayMode && gameBlocks && gameString) {
      ;(window as any).replayingAGame = true
      ;(window as any).preloadedGameBlocks = gameBlocks
      ;(window as any).preloadedGameString = gameString
    } else {
      ;(window as any).replayingAGame = false
    }

    // Initialize game - load the game script dynamically
    const script = document.createElement('script')
    script.src = '/game/main.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Stop game loop
      if ((window as any).stopTheGameLoop) {
        (window as any).stopTheGameLoop = true
      }
    }
  }, [replayMode, gameBlocks, gameString])

  return (
    <div id="game-container">
      <div>
        <canvas
          ref={nextBlocksCanvasRef}
          id="nextBlocksAreaCanvas"
          width="280"
          height="40"
        />
      </div>
      <div>
        <canvas
          ref={playAreaCanvasRef}
          id="playAreaCanvas"
          width="200"
          height="600"
          style={{ border: '2px solid #666666', backgroundColor: '#111111' }}
        />
      </div>
      <span style={{ display: 'none' }}>
        <canvas
          ref={gravityCanvasRef}
          id="currentGravityCalculationAreaCanvas"
          width="320"
          height="600"
          style={{ border: '1px solid #666666' }}
        />
      </span>
    </div>
  )
}
