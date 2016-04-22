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

export const setBoardCellContent = (marker) => {
  return {
    type: 'SET_BOARD_CELL_CONTENT',
    content: marker
  }
}
