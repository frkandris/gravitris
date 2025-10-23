'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { generateRandomName } from '@/lib/nameGenerator'

export default function Home() {
  const [playerName, setPlayerName] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Load player name from localStorage or generate a new one
    const savedName = localStorage.getItem('playerName')
    if (savedName && savedName.trim()) {
      setPlayerName(savedName)
    } else {
      // Auto-generate and populate a name
      const newName = generateRandomName()
      setPlayerName(newName)
      localStorage.setItem('playerName', newName)
    }
  }, [])

  const handleGenerateName = () => {
    const newName = generateRandomName()
    setPlayerName(newName)
    localStorage.setItem('playerName', newName)
  }

  const handlePlay = () => {
    const finalName = playerName.trim() || generateRandomName()
    localStorage.setItem('playerName', finalName)
    window.location.href = '/game'
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePlay()
    }
  }

  return (
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto px-3">
      <div className="jumbotron bg-transparent text-center mb-0 mx-auto">
        <h1 className="text-light">Gravitris</h1>
        <br />
        <br />
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="player-name"
            placeholder="Nickname"
            maxLength={16}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-10">
            <div className="row">
              <div className="col-6">
                <button 
                  className="btn btn-secondary w-100" 
                  onClick={handleGenerateName}
                >
                  Generate Nickname
                </button>
              </div>
              <div className="col-6">
                <button 
                  id="play-button" 
                  className="btn btn-primary w-100" 
                  onClick={handlePlay}
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
