const gameReducer = (state, event) => {
  switch (event) {
    case 'playing':
      return { ...state, playing: true }
    case 'name-change':
      return { ...state, me: { ...state.me, name: event.payload } }
    default:
      return state
  }
}

export default gameReducer;