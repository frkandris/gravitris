import Link from 'next/link'
import { numberWithCommas } from '@/lib/utils'
import { getPrisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const prisma = getPrisma()
    const [linesCleared, gamesPlayed] = await Promise.all([
      prisma.counter.findUnique({
        where: { counterName: 'linesCleared' }
      }),
      prisma.counter.findUnique({
        where: { counterName: 'gamesPlayed' }
      })
    ])

    return {
      linesCleared: linesCleared?.counterValue || 0,
      gamesPlayed: gamesPlayed?.counterValue || 0
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { linesCleared: 0, gamesPlayed: 0 }
  }
}

export default async function About() {
  const stats = await getStats()

  return (
    <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto px-3">
      <div className="jumbotron bg-transparent text-center mb-0 mx-auto">
        <h1 className="text-light" style={{ fontSize: '3rem', fontWeight: 'bold' }}>Gravitris v2.0.5</h1>
        <br />
        <p style={{ fontSize: '1.2rem', color: '#cccccc' }}>
          <span style={{ color: '#ffffff', fontWeight: '500' }}>{numberWithCommas(stats.linesCleared)} lines</span> have been cleared in{' '}
          <span style={{ color: '#ffffff', fontWeight: '500' }}>{numberWithCommas(stats.gamesPlayed)} games</span>
        </p>
        <br />
        <p style={{ fontSize: '1.1rem' }}>
          <i className="fab fa-github-square" style={{ color: '#4a9eff' }}></i>{' '}
          <span style={{ color: '#cccccc' }}>View</span>{' '}
          <a 
            href="https://github.com/frkandris/gravitris" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#4a9eff', textDecoration: 'none' }}
          >
            source code
          </a>{' '}
          <span style={{ color: '#cccccc' }}>at github.com</span>
        </p>
        <br />
        <Link href="/game">
          <button type="button" className="btn btn-primary">
            Play
          </button>
        </Link>
      </div>
    </div>
  )
}
