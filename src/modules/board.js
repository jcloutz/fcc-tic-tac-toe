export const PLACE_MARKER = 'fcc-tic-tac-toe/board/PLACE_MARKER'
const INITIALIZE_BOARD = 'fcc-tic-tac-toe/board/INITIALIZE_BOARD'
const RESET = 'RESET'

const initialState = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_MARKER:
      const { row, cell, marker } = action.payload
      return getNewBoard(state, row, cell, marker)
    case INITIALIZE_BOARD:
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

export const initBoard = () => ({
  type: INITIALIZE_BOARD
})

// Utilities
export const getNewBoard = (board, row, cell, marker) => {
  return [
    ...board.slice(0, row), // copy previous rows
    [
      ...board[row].slice(0, cell), // copy previous cells
      marker, // set marker
      ...board[row].slice(cell + 1) // copy later cells
    ],
    ...board.slice(row + 1) // copy any later rows
  ]
}
