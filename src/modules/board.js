export const PLACE_MARKER = 'fcc-tic-tac-toe/board/PLACE_MARKER'
export const INITIALIZE_BOARD = 'fcc-tic-tac-toe/board/INITIALIZE_BOARD'
export const SET_BOARD_VISIBILITY = 'fcc-tic-tac-toe/board/SET_BOARD_VISIBILITY'
export const SET_BOARD_CLICKABLE = 'fcc-tic-tac-toe/board/SET_BOARD_CLICKABLE'
export const RESET_BOARD = 'fcc-tic-tac-toe/board/RESET_BOARD'

const RESET = 'RESET'

const initialState = {
  visible: false,
  clickable: false,
  cells: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_VISIBILITY:
      return {
        ...state,
        visible: action.payload
      }
    case SET_BOARD_CLICKABLE:
      return {
        ...state,
        clickable: action.payload
      }
    case PLACE_MARKER:
      const { row, cell, marker } = action.payload
      console.log('placing marker', action.payload)
      return {
        ...state,
        cells: getNewBoard(state.cells, row, cell, marker)
      }
    case INITIALIZE_BOARD:
      return {
        ...state,
        cells: initialState.board
      }
    case RESET_BOARD:
      return {
        ...state,
        cells: initialState.cells,
        clickable: true
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export const setBoardVisibility = (visible) => {
  return dispatch => {
    dispatch({
      type: SET_BOARD_VISIBILITY,
      payload: visible
    })

    // set board to clickable after css animation finishes
    if (visible === true) {
      setTimeout(() => {
        dispatch(setBoardClickable(true))
      }, 2400)
    } else { // set board to un-clickable immediately
      dispatch(setBoardClickable(false))
    }
  }
}

export const setBoardClickable = (clickable) => ({
  type: SET_BOARD_CLICKABLE,
  payload: clickable
})

export const placeMarker = (payload) => {
  return {
    type: PLACE_MARKER,
    payload
  }
}

export const initBoard = () => ({
  type: INITIALIZE_BOARD
})

export const resetBoard = () => ({
  type: RESET_BOARD
})

// Utilities
export const getNewBoard = (boardCells, row, cell, marker) => {
  return [
    ...boardCells.slice(0, row), // copy previous rows
    [
      ...boardCells[row].slice(0, cell), // copy previous cells
      marker, // set marker
      ...boardCells[row].slice(cell + 1) // copy later cells
    ],
    ...boardCells.slice(row + 1) // copy any later rows
  ]
}
