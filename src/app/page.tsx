'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [playerName, setPlayerName] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Load player name from localStorage
    const savedName = localStorage.getItem('playerName')
    if (savedName) {
      setPlayerName(savedName)
    }
  }, [])

  const generateRandomName = () => {
    const animals = [
      'Alligator', 'Ant', 'Bear', 'Bee', 'Bird', 'Camel', 'Cat', 'Cheetah', 
      'Chicken', 'Chimpanzee', 'Cow', 'Crocodile', 'Deer', 'Dog', 'Dolphin', 
      'Duck', 'Eagle', 'Elephant', 'Fish', 'Fly', 'Fox', 'Frog', 'Giraffe', 
      'Goat', 'Goldfish', 'Hamster', 'Hippopotamus', 'Horse', 'Kangaroo', 
      'Kitten', 'Lion', 'Lobster', 'Monkey', 'Octopus', 'Owl', 'Panda', 
      'Pig', 'Puppy', 'Rabbit', 'Rat', 'Scorpion', 'Seal', 'Shark', 'Sheep', 
      'Snail', 'Snake', 'Spider', 'Squirrel', 'Tiger', 'Turtle', 'Wolf', 'Zebra'
    ]
    return `Anonymous ${animals[Math.floor(Math.random() * animals.length)]}`
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
          id="play-button" 
          className="btn btn-primary btn-lg" 
          onClick={handlePlay}
        >
          Play
        </button>
      </div>
    </div>
  )
}
