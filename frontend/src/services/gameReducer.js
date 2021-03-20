const gameReducer = (state, event) => {
  switch (event) {
    case 'playing':
      return { ...state, playing: true }
    default:
      return state
  }
}

const meReducer = (state, event) => {
  
}

export default gameReducer;