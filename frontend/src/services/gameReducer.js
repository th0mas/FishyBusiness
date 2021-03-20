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
        players.push(event.payload[key].metas[0]);
      }
      return {
        ...state, players: players
      }
    case 'presence_diff':
      let p = [];
      for (let key in event.payload.joins) {
        p.push(event.payload.joins[key].metas[0]);
      }
      return {
        ...state, players: (state.players.concat(p))
      }
    default:
      return state
  }
}

export default gameReducer;