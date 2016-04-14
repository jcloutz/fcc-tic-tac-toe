class Board {
  constructor (board) {
    this.board = board || [
      [Board.EMPTY, Board.EMPTY, Board.EMPTY],
      [Board.EMPTY, Board.EMPTY, Board.EMPTY],
      [Board.EMPTY, Board.EMPTY, Board.EMPTY]
    ]
    this.setCellValue = this.setCellValue.bind(this)
    this.getCellValue = this.getCellValue.bind(this)
    this.getBoard = this.getBoard.bind(this)
    this.getOpenCells = this.getOpenCells.bind(this)
    this.clearCell = this.clearCell.bind(this)
  }

  setCellValue (marker, [row, col]) {
    if (this.board[row][col] !== Board.EMPTY) {
      throw new Error('Cell cannot be re-assigned')
    }
    this.board[row][col] = marker
    return this
  }

  clearCell ([row, col]) {
    this.board[row][col] = Board.EMPTY
    return this
  }

  getCellValue ([row, col]) {
    return this.board[row][col]
  }

  getBoard () {
    return this.board
  }

  getOpenCells () {
    let cells = []
    for (let row = 0; row < this.board.length; row++) {
      for (let cell = 0; cell < this.board[row].length; cell++) {
        if (this.board[row][cell] === Board.EMPTY) cells.push([row, cell])
      } // end cell loop
    } // end row loop

    return cells
  }

  toString () {
    let board = ''
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        let cell = this.board[row][col] ? this.board[row][col] : ' '
        board += cell
        board += col < 2 ? ' | ' : '\n'
      }
      board += row < 2 ? '--------- \n' : ''
    }

    return board
  }
}

Board.X = 'X'
Board.O = 'O'
Board.EMPTY = null

module.exports = Board
