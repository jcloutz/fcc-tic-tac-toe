export default (state = null, action) => {
  switch (action.type) {
    case 'SET_PLAYER_COUNT':
      return action.playerCount
    default:
      return state
  }
}
