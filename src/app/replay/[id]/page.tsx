'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import GameCanvas from '@/components/GameCanvas'

export default function Replay() {
  const params = useParams()
  const [gameData, setGameData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameId = Array.isArray(params.id) ? params.id[0] : params.id
        if (!gameId) {
          setError('No game ID provided')
          setLoading(false)
          return
        }

        const response = await fetch(`/api/game/${gameId}`)
        if (response.ok) {
          const data = await response.json()
          setGameData(data)
        } else {
          const errorData = await response.json()
          setError(errorData.error || 'Failed to load game')
        }
      } catch (error) {
        console.error('Error loading game replay:', error)
        setError('Error loading game replay')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchGameData()
    }
  }, [params.id])

  if (loading) {
    return <div className="text-center text-light">Loading replay...</div>
  }

  if (error) {
    return <div className="text-center text-light">{error}</div>
  }

  if (!gameData) {
    return <div className="text-center text-light">Game not found</div>
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <GameCanvas 
            replayMode={true}
            gameBlocks={gameData.gameBlocks}
            gameString={gameData.gameString}
          />
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
