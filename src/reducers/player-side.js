export default (state = null, action) => {
  switch (action.type) {
    case 'SET_PLAYER1_SIDE':
      return action.side
    default:
      return state
  }
}
