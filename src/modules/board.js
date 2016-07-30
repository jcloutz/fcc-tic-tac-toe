const PLACE_MARKER = 'fcc-tic-tac-toe/board/PLACE_MARKER'
const RESET_BOARD = 'fcc-tic-tac-toe/board/RESET_BOARD'
const RESET = 'RESET'

const initialState = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_MARKER:
      let board = [...state]
      board[action.payload.row][action.payload.cell] = action.payload.marker

      return board
    case RESET_BOARD:
      return initialState
    case RESET:
      return initialState
    default:
      return state
  }
}

export default reducer

export const placeMarker = (payload) => {
  return {
    type: PLACE_MARKER,
    payload
  }
}
