const gameReducer = (state, event) => {
  console.log(event)
  switch (event.event) {
    case 'playing':
      return { ...state, playing: event.payload }
    case 'name-change':
      return { ...state, me: { ...state.me, name: event.payload } }
    case 'presence_state':
      let players = [];
      for (let key in event.payload) {
        players.push(event.payload[key].metas);
      }
      console.log(players)
      return {
        ...state, players: players
      }
    default:
      return state
  }
}

export default gameReducer;