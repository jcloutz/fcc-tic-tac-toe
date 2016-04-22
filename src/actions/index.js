export const setPlayerCount = (count) => {
  return {
    type: 'SET_PLAYER_COUNT',
    playerCount: count
  }
}

export const setPlayer1Side = (side) => {
  return {
    type: 'SET_PLAYER1_SIDE',
    side
  }
}
