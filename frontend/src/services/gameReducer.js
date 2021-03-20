const gameReducer = (state, event) => {
  switch (event.event) {
    case 'playing':
      return { ...state, playing: event.payload }
    case 'name-change':
      return { ...state, me: { ...state.me, name: event.payload } }
    default:
      return state
  }
}

export default gameReducer;