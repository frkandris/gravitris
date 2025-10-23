const adjectives = [
  'Swift', 'Mighty', 'Clever', 'Brave', 'Epic', 'Cosmic', 'Stellar', 'Quantum',
  'Blazing', 'Thunder', 'Frost', 'Shadow', 'Golden', 'Crystal', 'Neon', 'Turbo',
  'Electric', 'Mystic', 'Hyper', 'Ultra', 'Super', 'Mega', 'Ninja', 'Cyber',
  'Atomic', 'Laser', 'Plasma', 'Diamond', 'Phoenix', 'Dragon', 'Vortex', 'Storm'
]

const nouns = [
  'Fox', 'Wolf', 'Eagle', 'Falcon', 'Hawk', 'Tiger', 'Lion', 'Panda',
  'Bear', 'Shark', 'Dragon', 'Phoenix', 'Cobra', 'Panther', 'Raven', 'Lynx',
  'Otter', 'Badger', 'Owl', 'Penguin', 'Puma', 'Leopard', 'Cheetah', 'Raptor',
  'Viper', 'Manta', 'Jaguar', 'Orca', 'Dolphin', 'Octopus', 'Kraken', 'Yeti'
]

export function generateRandomName(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adjective}${noun}`
}
