// import Board from '../lib/board.js'

const emptyBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
export default (state = emptyBoard, action) => {
  switch (action.type) {
    case 'SET_BOARD_CELL_CONTENT':

      break
    case 'RESET_BOARD':
      return emptyBoard
    default:
      return state
  }
}
