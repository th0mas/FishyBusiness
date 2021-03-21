const LeaderboardEntry = ({ player, me }) => {
  let bg = me ? "bg-gray-200" : "bg-white"

  return (
    <tr className={`${bg} border-4 border-gray-200`}>
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