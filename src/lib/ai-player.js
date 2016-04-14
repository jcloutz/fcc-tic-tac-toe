import Board from './board'

class AIPlayer {
  constructor (side = board.X, board) {
    this.side = side
    this.oppSide = this.side === Board.X ? Board.O : Board.X
    this.board = board
    this.depth = 2

    this.minimax = this.minimax.bind(this)
    this.getNextMoves = this.getNextMoves.bind(this)
    this.gameOver = this.gameOver.bind(this)
    this.evaluateBoard = this.evaluateBoard.bind(this)
    this.evaluateLine = this.evaluateLine.bind(this)
  }

  move () {
    const score = this.minimax(this.depth, this.side)
    return score.bestMove
  }

  minimax (depth, side) {
    // console.log('running minimax for ', side)
    const moves = this.getNextMoves()
    let bestScore = side === this.side ? -5000 : 5000
    let bestMove = [-1, -1]
    // console.log('depth:', depth, ', open cells:', moves)
    if (moves.length === 0 || depth === 0) {
      bestScore = this.evaluateBoard()
    } else {
      for (let i = 0; i < moves.length; i++) {
        if (this.depth === depth) console.log(moves[i], '----------------')
        console.log('----', depth, '----')
        this.board.setCellValue(side, moves[i])
        if (side === this.side) { // maximize ai player
          let score = this.minimax(depth - 1, this.oppSide)
          if (score.bestScore > bestScore) {
            bestScore = score.bestScore
            bestMove = moves[i]
            console.log('best max score:', score.bestScore, '>', bestScore, 'best move:', moves[i])
          }
        } else { // minimize opponent
          let score = this.minimax(depth - 1, this.side)
          if (score.bestScore < bestScore) {
            bestScore = score.bestScore
            bestMove = moves[i]
            console.log('best min score:', score.bestScore, '<', bestScore, 'best move:', moves[i])
          }
        }

        this.board.clearCell(moves[i])
      }
    }
    // console.log('Minimax return:', {bestScore, bestMove})
    return { bestScore, bestMove }
  }

  getNextMoves () {
    if (this.gameOver()) return []
    return this.board.getOpenCells()
  }

  gameOver () {
    for (let i = 0; i < AIPlayer.winningStates.length; i++) {
      let lineEval = this.evaluateLine(AIPlayer.winningStates[i])
      if (lineEval === 100 || lineEval === -100) {
        // console.log('game over')
        return true
      }
    }
    return false
  }

  evaluateBoard () {
    let score = 0
    for (let i = 0; i < AIPlayer.winningStates.length; i++) {
      score += this.evaluateLine(AIPlayer.winningStates[i])
    }
    return score
  }

  // 0 for rows with both players marks
  //
  // +1 for one in a line with empty cells for ai player
  // +10 for two in a line with empty cells for ai player
  // +100 for three in a line for ai player
  //
  // -1 for one in a line with empty cells for opponent
  // -10 for 1 in a line with empty cells for opponent
  // -100 for 3 in a line for opponent
  evaluateLine (line) {
    let sideCount = 0
    let enemyCount = 0
    let emptyCount = 0
    let lineScore = 0

    for (let i = 0; i < line.length; i++) {
      let cellContent = this.board.getCellValue(line[i])
      if (cellContent === this.side) {
        sideCount += 1
      } else if (cellContent === this.oppSide) {
        enemyCount += 1
      } else {
        emptyCount += 1
      }
    }
    // console.log('=================================')
    // console.log('Evaluating Line:', line)
    // console.log('Side Count:', sideCount)
    // console.log('Enemy Count:', enemyCount)
    // console.log('Empty Count:', emptyCount)
    if (sideCount > 0 && enemyCount > 0) { // enemy and friendly present = 0
      return 0
    }

    if (emptyCount === 3) { // empty line = 1
      return 1
    }

    // Mixed lines and empty lines are accounted for.
    // Evaluate marks for either player or enemy
    switch (sideCount) {
      case 1:
        lineScore = 1
        break
      case 2:
        lineScore = 10
        break
      case 3:
        lineScore = 100
    }

    switch (enemyCount) {
      case 1:
        lineScore = -1
        break
      case 2:
        lineScore = -10
        break
      case 3:
        lineScore = -100
    }
    // console.log('Line Score:', lineScore)
    // console.log('=================================')
    return lineScore
  }
}

AIPlayer.winningStates = [
  [[0, 0], [0, 1], [0, 2]], // 1st row
  [[1, 0], [1, 1], [1, 2]], // 2nd row
  [[2, 0], [2, 1], [2, 2]], // 3rd row
  [[0, 0], [1, 0], [2, 0]], // 1st column
  [[0, 1], [1, 1], [2, 1]], // 2nd column
  [[0, 2], [1, 2], [2, 2]], // 3rd column
  [[0, 0], [1, 1], [2, 2]], // diag top left to bottom right
  [[0, 2], [1, 1], [2, 0]] // diag top right to bottom left
]

module.exports = AIPlayer
