import Link from 'next/link'
import { getPrisma } from '@/lib/prisma'
import { numberWithCommas } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function getLeaderboard() {
  try {
    const prisma = await getPrisma()
    const games = await prisma.gameRecording.findMany({
      orderBy: {
        points: 'desc'
      },
      take: 20
    })
    return games
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}

export const revalidate = 0 // Don't cache this page

export default async function Leaderboard() {
  const games = await getLeaderboard()

  return (
    <div className="jumbotron bg-transparent mb-0 mx-auto text-center">
      <h1 className="text-light text-center">Leaderboard</h1>
      <br />
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col" className="text-center">#</th>
            <th scope="col" className="text-center">Name</th>
            <th scope="col" className="text-center">Points</th>
            <th scope="col" className="text-center">Level</th>
            <th scope="col" className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={game.id}>
              <th scope="row" className="text-center">{index + 1}</th>
              <td className="text-left">{game.playerName}</td>
              <td className="text-right">{numberWithCommas(game.points)}</td>
              <td className="text-center">{game.gameLevel}</td>
              <td className="text-center">
                <Link href={`/replay/${game.id}`}>Replay</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link href="/game">
        <button type="button" className="btn btn-primary">
          Play
        </button>
      </Link>
    </div>
  )
}
