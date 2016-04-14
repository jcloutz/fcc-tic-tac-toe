const test = require('tape')
const Board = require('../src/lib/board')
const AIPlayer = require('../src/lib/ai-player')

test('evaluateLine() with 0 marks', (t) => {
  const boardSeed = [
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]
  const board = new Board(boardSeed)
  const player = new AIPlayer(Board.X, board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 1, 'Should equal 1')
  t.end()
})

test('evaluateLine() with 1 friendly mark', (t) => {
  const boardSeed = [
    [Board.X, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]
  const board = new Board(boardSeed)
  const player = new AIPlayer(Board.X, board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 1, 'Should equal 1')
  t.end()
})

test('evaluateLine() with 1 friendly mark & 1 enemy mark', (t) => {
  const boardSeed = [
    [Board.X, Board.O, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]
  const board = new Board(boardSeed)
  const player = new AIPlayer(Board.X, board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 0, 'Should equal 0')
  t.end()
})

test('evaluateLine() with 2 friendly marks & 1 empty mark', (t) => {
  const boardSeed = [
    [Board.X, Board.X, Board.O],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]

  const board = new Board(boardSeed)
  const player = new AIPlayer(Board.X, board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 0, 'Should equal 0')
  t.end()
})

test('evaluateLine() with 2 friendly marks', (t) => {
  const boardSeed = [
    [Board.X, Board.X, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]

  const board = new Board(boardSeed)
  const player = new AIPlayer(Board.X, board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 10, 'Should equal 10')
  t.end()
})

test('evaluateLine() with 2 enemy marks', (t) => {
  const boardSeed = [
    [Board.O, Board.EMPTY, Board.O],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]

  const board = new Board(boardSeed)
  const player = new AIPlayer(Board.X, board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), -10, 'Should equal -10')
  t.end()
})

test('evaluateLine() with 3 friendly marks', (t) => {
  const boardSeed = [
    [Board.X, Board.X, Board.X],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]

  const board = new Board(boardSeed)
  const player = new AIPlayer(Board.X, board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 100, 'Should equal 100')
  t.end()
})

test('evaluateLine() with 3 enemy marks', (t) => {
  const boardSeed = [
    [Board.O, Board.O, Board.O],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]

  const board = new Board(boardSeed)
  const player = new AIPlayer(Board.X, board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), -100, 'Should equal -100')
  t.end()
})
