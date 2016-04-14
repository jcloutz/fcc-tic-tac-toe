'use strict'
require('babel-register')
const Board = require('./board')
const AIPlayer = require('./ai-player')

const boardSeed = [
  [Board.EMPTY, Board.EMPTY, Board.O],
  [Board.EMPTY, Board.EMPTY, Board.EMPTY],
  [Board.X, Board.EMPTY, Board.O]
]

const board = new Board(boardSeed)
// const player = new AIPlayer('X', board)
// console.log(player.gameOver())
let curPlayer = 'X'
let game = setInterval(() => {
  let player
  if (curPlayer === 'X') {
    player = new AIPlayer('X', board)
    board.setCellValue('X', player.move())
    curPlayer = 'O'
  } else {
    player = new AIPlayer('O', board)
    board.setCellValue('O', player.move())
    curPlayer = 'X'
  }
  console.log(board.toString())
  console.log(player.gameOver())
  if (player.gameOver()) {
    clearInterval(game)
  }
}, 600)
// console.log('finished:', player.minimax(4, Board.O))
// console.log(board.toString())
