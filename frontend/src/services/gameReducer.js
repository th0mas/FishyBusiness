const gameReducer = (state, event) => {
  switch (event) {
    case 'playing':
      return { ...state, playing: true }
    default:
      return state
  }
}

export default gameReducer;