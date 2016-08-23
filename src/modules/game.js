/**
 * Minmax algorithm is inspired and partially borrowed from the following sources
 * http://stackoverflow.com/questions/31526902/implementing-the-minimax
 * http://neverstopbuilding.com/minimax
 * https://www3.ntu.edu.sg/home/ehchua/programming/java/JavaGame_TicTacToe_AI.html
 */

export const PLACE_MARKER = 'fcc-tic-tac-toe/board/PLACE_MARKER'
export const SET_BOARD_VISIBILITY = 'fcc-tic-tac-toe/board/SET_BOARD_VISIBILITY'
export const SET_BOARD_CLICKABLE = 'fcc-tic-tac-toe/board/SET_BOARD_CLICKABLE'
export const RESET_BOARD = 'fcc-tic-tac-toe/board/RESET_BOARD'

export const SET_PLAYER = 'fcc-tic-tac-toe/game/SET_PLAYER'
// export const TOGGLE_ACTIVE_PLAYER = 'fcc-tic-tac-toe/game/TOGGLE_ACTIVE_PLAYER'
export const SET_WINNER = 'fcc-tic-tac-toe/game/SET_WINNER'
export const SET_GAME_OVER = 'fcc-tic-tac-toe/game/SET_GAME_OVER'
// this action does not map to a state value. It is only meant to intercepted by
// middleware to enable the AI to know it is time to move if it is up first.
export const BOARD_READY = 'fcc-tic-tac-toe/board/BOARD_READY'

const RESET = 'RESET'

// define all possible winning board configurations
const winningLines = [
  [[0, 0], [0, 1], [0, 2]], // 1st row
  [[1, 0], [1, 1], [1, 2]], // 2nd row
  [[2, 0], [2, 1], [2, 2]], // 3rd row
  [[0, 0], [1, 0], [2, 0]], // 1st column
  [[0, 1], [1, 1], [2, 1]], // 2nd column
  [[0, 2], [1, 2], [2, 2]], // 3rd column
  [[0, 0], [1, 1], [2, 2]], // diag top left to bottom right
  [[0, 2], [1, 1], [2, 0]] // diag top right to bottom left
]

export const initialState = {
  player1: null,
  player2: null,
  active: null,
  winner: null,
  visible: false,
  clickable: false,
  ready: false,
  winningLine: null,
  gameOver: false,
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
}

/**
 * Reducer
 */
const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return {
        ...state,
        player1: action.payload,
        player2: action.payload === 'x' ? 'o' : 'x',
        active: 'x'
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
    case BOARD_READY:
      return {
        ...state,
        clickable: state.active === state.player1,
        ready: true
      }
    case PLACE_MARKER:
      const { row, cell, marker } = action.payload
      return {
        ...state,
        active: state.active === 'x' ? 'o' : 'x',
        clickable: !state.clickable,
        board: getNewBoard(state.board, row, cell, marker)
      }
    case SET_WINNER:
      const { winningLine, winner } = action.payload
      return {
        ...state,
        board: getWinningBoard(winningLine, winner),
        winner: winner,
        winningLine: winningLine,
        gameOver: true,
        clickable: false
      }
    case SET_GAME_OVER:
      return {
        ...state,
        gameOver: true,
        clickable: false
      }
    case RESET_BOARD:
      return {
        ...state,
        active: 'x',
        winner: null,
        board: initialState.board,
        clickable: state.player1 === 'x',
        gameOver: false
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export default boardReducer
/**
 * Action Dispatchers
 */

/**
 * Set board visibility
 * @property  {boolean}   Boolean representation of the boards visibility
 * @return    {object}    Redux Action
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

/**
 * Set board clickable
 * @property  {boolean}   Boolean representation of the boards clickable state
 * @return    {object}    Redux Action
 */
export const setBoardClickable = (clickable) => ({
  type: SET_BOARD_CLICKABLE,
  payload: clickable
})

/**
 * Place marker on board
 * @property  {object}   Object representing the marker to place containg the
 *                       row, cell, and marker.
 *                       Example: {
 *                         row: 2,
 *                         cell: 0,
 *                         marker: 'x'
 *                       }
 * @return    {object}    Redux Action
 */
export const placeMarker = (payload) => ({
  type: PLACE_MARKER,
  payload
})

export const resetBoard = () => ({
  type: RESET_BOARD
})

export const setPlayer = (marker) => ({
  type: SET_PLAYER,
  payload: marker
})

/**
 * Set board visibilitye
 * @property  {object}   Object representing the winner of the game containing
 *                       the winner and winningLine as a 2d array of [row, cell]
 *                       Example: {
 *                         winner: 'x',
 *                         winningLine: [[0,0], [0,1], [0,2]]
 *                       }
 * @return    {object}    Redux Action
 */
export const setWinner = (payload) => ({
  type: SET_WINNER,
  payload
})

export const setGameOver = () => ({
  type: SET_GAME_OVER
})

/**
 * Utility Functions
 */

/**
 * Creates a fresh copy of the given board with the marker placed in the given
 * row and cell.
 * @param  {Array} boardCells    Current board configuration as a 2d array
 * @param  {Number} row          Row to place the marker in
 * @param  {Number} cell         Cell to place the marker in
 * @param  {String} marker       String representation of the marker to place.
 * @return {array}  New board
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

/**
 * Get a 2d array representation of the winning board with only the winning line
 * containing any marks.
 * @param  {Array} winningLine    Winning line as a 2d array of [row, cell]
 * @param  {String} winner        Winning mark to place in cells
 * @return {array}
 */
export const getWinningBoard = (winningLine, winner) => {
  return winningLine.reduce((board, cell) => {
    return getNewBoard(board, cell[0], cell[1], winner)
  }, initialState.board)
}

/**
 * Retrieves all available moves for the given board configuration
 * @param  {array} board 2-Dimensional array representation of the board
 * @return {array}       All available moves
 */
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

/**
 * Check if the given possible move is valid based on the board contents.
 * For instance if a line already contains an opponents mark then it is not
 * winnable.
 * @param  {object} current game state
 * @param  {array} An array representing the possiblem move eg. [row, col]
 * @param  {string} String representation of the marker to validate the line against.
 * @return {Boolean}
 */
export const isPossibleLine = (gameState, [row, col], marker) => {
  // get any lines that contain this cell
  const candidateLines = winningLines.filter((candidate) => {
    // does this candidate contain the desired cell?
    const result = candidate.filter(cell => {
      return cell[0] === row && cell[1] === col
    }).length > 0

    // possibly valid
    if (result) {
      const opponent = marker === gameState.player1
                                  ? gameState.player2
                                  : gameState.player1
      // check line contents
      const lineContent = getLineContent(gameState.board, candidate).join('')
      if (lineContent.indexOf(opponent) > -1) {
        return false
      }
      return true
    }
  })
  // get candiate lines content
  return candidateLines.length > 0
}

/**
 * Recursively evaluates moves for each cell on the board.
 *
 * @param  {Object} gameState    Current state of the game
 * @param  {Number} [depth=0]    Current depth of the algorithm
 * @param  {Number} [maxDepth=5] Maximum depth for the algorithm to evaluateBoard
 * @return {Number}              Best score for the given initial gameState
 */
const minmax = (gameState, depth = 0, maxDepth = 15) => {
  // Determine whether or not the game is over.
  // If it is or maximum depth is reached then return the score for the given
  // end state.
  const gameStatus = isGameOver(gameState)
  if (gameStatus || depth > maxDepth) {
    return score(gameStatus, depth)
  }

  const { player1, player2, active, board } = gameState
  let bestScore

  // This assumes that player 2 is the computer i.e. the AI. If it is the
  // ai's turn that the score needs to be maximized.
  if (active === player2) {
    bestScore = -9999
    let moves = availableMoves(board)
    // evaluate each available move.
    moves.forEach(move => {
      let newScore
      if (isPossibleLine(gameState, move, player2)) {
        // get new state from the reducer by passing it the current move.
        let newState = boardReducer(gameState, placeMarker({
          row: move[0],
          cell: move[1],
          marker: active
        }))
        // pass new state to minmax and increment the depth
        newScore = minmax(newState, ++depth)
      } else {
        newScore = 0
      }

      // change the best score if necessary.
      if (newScore > bestScore) {
        bestScore = newScore
      }
    }) // end foreach
  }

  // This assumes that player one is the human player. If it is the humans turn
  // then the score needs to minimized.
  if (active === player1) {
    bestScore = 9999
    let moves = availableMoves(board)
    // evaluate each available move
    moves.forEach(move => {
      let newScore
      if (isPossibleLine(gameState, move, player1)) {
        let newState = boardReducer(gameState, placeMarker({
          row: move[0],
          cell: move[1],
          marker: active
        }))
        // Pass the new state to minmax and increment depth
        newScore = minmax(newState, ++depth)
      } else {
        newScore = 0
      }
      // Get new game state from the reducer based on the given move

      // Change best score if necessary
      if (newScore < bestScore) {
        bestScore = newScore
      }
    }) // end foreach
  }

  return bestScore
}

export const getBestMove = (gameState) => {
  let bestScore = -9999
  let bestMove = null
  let moves = availableMoves(gameState.board)

  // Evaluate each available move
  moves.forEach(move => {
    // Get new state based on the current move.
    let newState = boardReducer(gameState, placeMarker({
      row: move[0],
      cell: move[1],
      marker: gameState.active
    }))
    // Pass state to minmax to get the best available score for the move
    let newScore = minmax(newState)
    // If the score is better than change it, and set best move.
    if (newScore > bestScore) {
      bestScore = newScore
      bestMove = move
    }
  })

  return bestMove
}

/**
 * Scores game state based on the given winner and the depth that the victory
 * achieved at.
 * @param  {Object} gameState Current game state
 * @param  {Number} depth     Depth of the win
 * @return {Number}           Numerical value of the game state.
 */
const score = (gameState, depth) => {
  // This assumes that player2 is the AI and that player1 is the human player.
  // If player2 has won then return a max score of 10 minus the depth at which
  // this score was achieved.
  //     Example: If a win is achieved for player 2 at depth 4 then it will
  //              return 10 - 4 for a total of 6.
  //              If a win is achieved for player 2 at depth 1 then it will
  //              return 10 - 1 for a total of 9
  //
  // If player 1 has won then return the depth that it was achieved minus the
  // max score
  //     Example: If a win for player 1 is achieved at depth 4 than it will
  //              return 4 - 10 for a total of -6
  //              If a win is achieved for player 1 at depth 1 then it will
  //              return 1 - 10 for a total of -9
  //
  // If there is no winner it will return 0
  if (gameState.winner === gameState.player2) {
    // ai player wins
    return 100 - depth
  } else if (gameState.winner === gameState.player1) {
    // human player wins
    return depth - 100
  } else {
    return 0 // draw
  }
}

/**
 * Checks if the current game is over based on the current board configuration
 * @param  {object} game Game state object returned from the game
 * @return {mixed}       False if game is no over, new state object if true
 */
export const isGameOver = (gameState) => {
  // Determine whether the game is over
  const gameResult = getWinner(gameState.board, gameState.player1, gameState.player2)

  // if game is over then return a new game state from the reducer with the
  // winner
  if (gameResult) {
    return boardReducer(gameState, setWinner(gameResult))
  }

  // if availableMoves = 0 then get a new game state from the reducer with
  // gameOver set to true
  if (availableMoves(gameState.board).length === 0) {
    return boardReducer(gameState, setGameOver())
  }

  return false
}

export const getLineContent = (board, line) => {
  return line.reduce((contents, [row, col]) => {
    contents.push(board[row][col])
    return contents
  }, [])
}

/**
 * Checks all possible lines for a winner based on the given markers and board
 * @param  {array} board  2-Dimensional representation of the current board
 *                        configuration
 * @param  {array} markers A list of markers to check against. Passed as
 *                         individual arguments
 * @return {mixed}         False if no match, or an object with properties for
 *                         `winner` and `winningLine`
 */
export const getWinner = (board, ...markers) => {
  // Evaluate each winning state.
  for (let i = 0; i < winningLines.length; i++) {
    // Gather line contents into an array
    const lineContents = getLineContent(board, winningLines[i])

    // evaluate each given marker, ie x or o, but could be anything.
    const result = markers.reduce((r, marker) => {
      // if the current marker produces a win for the given line then pass on
      // the winner and the winning line through the reducer function.
      if (isWinningLine(marker, lineContents)) {
        return {
          winner: marker,
          winningLine: winningLines[i]
        }
      }
      return r
    }, {})

    // if the result contains a winner then return it.
    if (result.winner) return result
  } // end for loop

  return false
}

/**
 * Checks the given line to ensure that there is 3 in a row of the given marker
 * @param  {String} marker String representation of the given marker
 * @param  {array} line   An array of the line contents
 * @return {boolean}        Whether or not the line contains 3 in a row
 */
export const isWinningLine = (marker, line) => {
  // Filter the given line for cells containing the given marker.
  // If the length of the filtered array is = 3 than it is 3 in a row and the
  // given player has won.
  return line.filter(c => (c === marker)).length === 3
}
