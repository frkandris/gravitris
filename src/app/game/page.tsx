'use client'

import { useEffect } from 'react'
import GameCanvas from '@/components/GameCanvas'

export default function Game() {
  useEffect(() => {
    // Increment games played counter
    fetch('/api/game/increment-games-played', {
      method: 'POST'
    }).catch(err => console.error('Failed to increment games played:', err))
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <GameCanvas />
        </div>
        <div className="col-sm">
          <div>
            <span id="chat-area"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
