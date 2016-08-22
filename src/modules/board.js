export const PLACE_MARKER = 'fcc-tic-tac-toe/board/PLACE_MARKER'
export const SET_BOARD_VISIBILITY = 'fcc-tic-tac-toe/board/SET_BOARD_VISIBILITY'
export const SET_BOARD_CLICKABLE = 'fcc-tic-tac-toe/board/SET_BOARD_CLICKABLE'
export const RESET_BOARD = 'fcc-tic-tac-toe/board/RESET_BOARD'

export const SET_PLAYER = 'fcc-tic-tac-toe/game/SET_PLAYER'
// export const TOGGLE_ACTIVE_PLAYER = 'fcc-tic-tac-toe/game/TOGGLE_ACTIVE_PLAYER'
export const SET_WINNER = 'fcc-tic-tac-toe/game/SET_WINNER'

// this action does not map to a state value. It is only meant to intercepted by
// middleware to enable the AI to know it is time to move if it is up first.
export const BOARD_READY = 'fcc-tic-tac-toe/board/BOARD_READY'

const RESET = 'RESET'

const initialState = {
  player: null,
  ai: null,
  active: 'x',
  winner: null,
  visible: false,
  clickable: false,
  cells: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
}

/**
 * Reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        player: action.payload,
        ai: action.payload === 'x' ? 'o' : 'x'
      }
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

      return {
        ...state,
        active: state.active === 'x' ? 'o' : 'x',
        cells: getNewBoard(state.cells, row, cell, marker)
      }
    case RESET_BOARD:
      return {
        ...state,
        active: 'x',
        winner: null,
        cells: initialState.cells,
        clickable: true
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

/**
 * Action Dispatchers
 */
export const setBoardVisibility = (visible) => {
  return dispatch => {
    dispatch({
      type: SET_BOARD_VISIBILITY,
      payload: visible
    })

    // set board to clickable after css animation finishes
    if (visible === true) {
      setTimeout(() => {
        dispatch(boardReady())
      }, 1800)
    } else { // set board to un-clickable immediately
      dispatch(setBoardClickable(false))
    }
  }
}

export const boardReady = () => ({
  type: BOARD_READY
})

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

export const resetBoard = () => ({
  type: RESET_BOARD
})

export const setPlayer = (marker) => ({
  type: SET_PLAYER,
  payload: marker
})

export const setWinner = (marker) => ({
  type: SET_WINNER,
  payload: marker
})

/**
 * Utility Functions
 */

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

const flatten = (board) => {
  return [].concat.apply([], board)
}

const emptySpaces = (board) => {
  return flatten(board).filter(cell => cell === null).length
}

const occupiedSpaces = (board) => {
  return flatten(board).filter(cell => cell !== null).length
}

const availableMoves = (board) => {
  let available = []
  board.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell === null) {
        available.push([rIdx, cIdx])
      }
    })
  })

  return available
}

const minimax = (gameState, depth = 0) => {
  // depth++
  // if game over()
  //   return score
  // if gameState.active === gameState.ai // maximize ai play
  //   bestScore = -9999
  //   availableMoves(gameState.board)
  //   foreach emptySpace:
  //     newState = reducer(gameState, placeMarker({row, cell, active}))
  //     newScore = minimax(newState, depth -1)
  //     if newScore > bestScore:
  //       bestScore = newScore
  //   return bestScore
  //
  // if gameState.active === gameState.player // minimize human player
  //   bestScore = 9999
  //   availableMoves(gameState.cells)
  //   foreeach emptySpaces:
  //     newState = reducer(gameState, placeMarker({row, cell, active}))
  //     newScore = minimax(newState, depth -1)
  //     if newScore < bestScore
  //       bestScore = newScore
  //   return bestScore
}

const getBestMove = (gameState) => {
  // bestScore = -9999
  // bestMove = null
  // availableMoves(gameState.board)
  // foreach move in emptySpace:
  //   newState = gameState.placeMarker({row, cell, marker})
  //   curScore = minMax(newState)
  //   if curScore > bestScore
  //     bestScore = curScore
  //     bestMove = move
  // return move
}

const score = (game, depth) => {
  // if ai wins
  //   return 10 - depth
  // else if player wins // human
  //   return depth -10
  // else
  //   return 0
}

/**
 * Checks if the given player has won based on the current board configuration
 * @param  {string}  marker String representation of the player marker to checking
 * @param  {array}  board  2-Dimensional array representation of the curren board configuration
 * @return {mixed}        Returns false if not a winner, otherwise returns an array of the winning line
 */
export const hasWon = (marker, board) => {
  let row, col, diag, revDiag
  let result = {
    won: false,
    line: []
  }

  row = winningRow(marker, board)
  if (row.length > 0) {
    result.won = true
    result.line = row
  }

  col = winningColumn(marker, board)
  if (!result.won && col.length > 0) {
    result.won = true
    result.line = col
  }

  diag = winningDiagonal(marker, board)
  if (!result.won && diag.length > 0) {
    result.won = true
    result.line = diag
  }

  revDiag = winningReverseDiagonal(marker, board)
  if (!result.won && revDiag.length > 0) {
    result.won = true
    result.line = revDiag
  }

  return result
}

/**
 * Checks if the current game is over based on the current board configuration
 * @param  {object} game Game state object returned from the game
 * @return {boolean}
 */
const gameOver = (game) => {
  const playerResult = hasWon(game.player, game.cells)
  const aiResult = hasWon(game.ai, game.cells)

  // if x or o has wo
  if (playerResult.won || aiResult.won) {
    return true
  }

  // if availableMoves = 0
  if (availableMoves(game.cells).length === 0) {
    return true
  }

  return false
}

/**
 * Checks all rows for a winning line based on the given marker and board
 * @param  {String} marker String representation of the marker to check against
 * @param  {array} board  2-Dimensional representation of the current board configuration
 * @return {array}        Array containing the winning row or empty if no winner
 */
export const winningRow = (marker, board) => {
  for (let row = 0; row < 3; row++) {
    let line = []
    let lineContents = []

    for (let col = 0; col < 3; col++) {
      line.push([row, col])
      lineContents.push(board[row][col])
    }

    if (checkLine(marker, lineContents)) {
      return line
    }
  } // end row loop
  return []
}

/* Checks all column for a winning line based on the given marker and board
* @param  {String} marker String representation of the marker to check against
* @param  {array} board  2-Dimensional representation of the current board configuration
* @return {array}        Array containing the winning column or empty if no winner
*/
export const winningColumn = (marker, board) => {
  for (let col = 0; col < 3; col++) {
    let line = []
    let lineContents = []
    for (let row = 0; row < 3; row++) {
      line.push([row, col])
      lineContents.push(board[row][col])
    }

    if (checkLine(marker, lineContents)) {
      return line
    }
  } // end col loop

  return []
}

/**
 * Checks the first diagonal (top-left -> bottom-right)
 * @param  {String} marker String representation of the given marker
 * @param  {array} board  2-Dimensional array representation of the board configuration
 * @return {array}        Array containing the winning diagonal or empty if no winner
 */
export const winningDiagonal = (marker, board) => {
  let line = [[0, 0], [1, 1], [2, 2]]
  let lineContents = [board[0][0], board[1][1], board[2][2]]

  if (checkLine(marker, lineContents)) {
    return line
  }

  return []
}

/**
 * Checks the first diagonal (top-right -> bottom-left)
 * @param  {String} marker String representation of the given marker
 * @param  {array} board  2-Dimensional array representation of the board configuration
 * @return {array}        Array containing the winning diagonal or empty if no winner

 */
export const winningReverseDiagonal = (marker, board) => {
  let line = [[0, 2], [1, 1], [2, 0]]
  let lineContents = [board[0][2], board[1][1], board[2][0]]

  if (checkLine(marker, lineContents)) {
    return line
  }

  return []
}
/**
 * Checks the given line to ensure that there is 3 in a row of the given marker
 * @param  {String} marker String representation of the given marker
 * @param  {array} line   An array of the line contents
 * @return {boolean}        Whether or not the line contains 3 in a row
 */
export const checkLine = (marker, line) => {
  return line.filter(c => (c === marker)).length === 3
}
