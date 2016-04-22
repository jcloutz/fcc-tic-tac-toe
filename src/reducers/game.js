export default (state = 'GAME_PENDING', action) => {
  switch (action.type) {
    case 'START_GAME':
      return 'GAME_INTIALIZED'
    case 'RESTART_GAME':
      return 'GAME_PENDING'
    default:
      return state
  }
}
