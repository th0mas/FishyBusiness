const LeaderboardEntry = ({ player }) => {
  console.log(player)
  return (
    <tr className="bg-white border-4 border-gray-200">
    <td className="px-16 py-2">
      <span className="font-semibold">{player.name}</span>
    </td>
    <td className="px-16 py-2">
      <span>£{player.money}</span>
    </td>
  </tr>
  )
}

export default LeaderboardEntry