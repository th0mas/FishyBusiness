const gameReducer = (state, event) => {
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
      return { ...state, me: { ...state.me, name: event.payload }}
    case 'items-update':
      return { ...state, me: { ...state.me, items: event.payload}}
    case 'money-update':
      return { ...state, me: { ...state.me, money: event.payload}}
    case 'init_game':
      return {...state, ...event.payload}
    default:
      return state
  }
}

export default gameReducer;