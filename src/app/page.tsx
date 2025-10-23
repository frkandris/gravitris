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
        <button 
          className="btn btn-secondary mb-3" 
          onClick={handleGenerateName}
        >
          Generate Nickname
        </button>
        <br />
        <button 
          id="play-button" 
          className="btn btn-primary btn-lg" 
          onClick={handlePlay}
        >
          Play
        </button>
        <br />
        <br />
        <p style={{ fontSize: '1.1rem', color: '#cccccc', lineHeight: '2' }}>
          Use <i className="fas fa-arrow-alt-circle-left" style={{ color: '#4a9eff' }}></i> and{' '}
          <i className="fas fa-arrow-alt-circle-right" style={{ color: '#4a9eff' }}></i> to{' '}
          <span style={{ color: '#ffffff' }}>move blocks</span><br />
          <i className="fas fa-arrow-alt-circle-up" style={{ color: '#4a9eff' }}></i> and{' '}
          <i className="fas fa-arrow-alt-circle-down" style={{ color: '#4a9eff' }}></i> to{' '}
          <span style={{ color: '#ffffff' }}>rotate blocks</span><br />
          <span style={{ color: '#ffffff', fontWeight: '500' }}>Space</span> to{' '}
          <span style={{ color: '#ffffff' }}>instant drop</span>
        </p>
      </div>
    </div>
  )
}
