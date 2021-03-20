const gameReducer = (state, event) => {
  switch (event) {
    case 'fish':
      return { ...state, noOfFish: 10 }
    default:
      return state
  }
}

export default gameReducer;