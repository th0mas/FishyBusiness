const gameReducer = (state, event) => {
  console.log(event)
  switch (event.event) {
    case 'playing':
      return { ...state, playing: event.payload }
    case 'name-change':
      return { ...state, me: { ...state.me, name: event.payload } }
    case 'presence_state':
      return { ...state, players: event.payload.test.metas }
    default:
      return state
  }
}

export default gameReducer;