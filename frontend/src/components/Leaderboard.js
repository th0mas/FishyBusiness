import LeaderboardEntry from './LeaderboardEntry';

const Leaderboard = ({ players, me }) => {
  const orderedPlayers = []

  for (const player in players) {
    orderedPlayers.push(players[player])
  }

  orderedPlayers.sort((a, b) => (a.money < b.money) ? 1 : -1)

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="justify-between">
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-300">Name</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Money</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {orderedPlayers.map(player => <LeaderboardEntry key={player.name} player={player} me={player.name === me.name}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard