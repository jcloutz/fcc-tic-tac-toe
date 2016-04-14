const test = require('tape')
const Board = require('../src/lib/board')

test('Test getCellValue()', (t) => {
  const board = new Board()

  t.notOk(board.getCellValue([1, 1]), 'Cell value at 1, 1 should not be ok! i.e. null')
  t.end()
})

test('Test setCellValue()', (t) => {
  const board = new Board()
  const boardInstance = board.setCellValue(Board.O, [1, 1])
  t.ok(boardInstance instanceof Board, 'setCellValue() should return instance of Board i.e. self')
  t.equals(board.getCellValue([1, 1]), Board.O, 'Cell Value at 1, 1 should be equal to "o"')
  t.end()
})

test('Test setCellValue by attempting to overwrite existing value', (t) => {
  const boardSeed = [
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.X, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]
  const board = new Board(boardSeed)

  try {
    board.setCellValue(Board.O, [1, 1])
  } catch (e) {
    t.equal(e.message, 'Cell cannot be re-assigned', 'Attempting to overwrite a marker should produce an arror')
  }
  t.equal(board.getCellValue([1, 1]), Board.X, 'Cell value should still be "x"')
  t.end()
})

test('Test getBoard()', (t) => {
  const boardSeed = [
    [Board.EMPTY, Board.EMPTY, Board.EMPTY],
    [Board.EMPTY, Board.X, Board.EMPTY],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]
  const board = new Board(boardSeed)

  t.equals(boardSeed, board.getBoard(), 'Boards should match')
  t.end()
})

test('Test getOpenCells()', (t) => {
  const boardSeed = [
    [Board.X, Board.O, Board.X],
    [Board.X, Board.O, Board.O],
    [Board.EMPTY, Board.EMPTY, Board.EMPTY]
  ]
  const board = new Board(boardSeed)
  const possibleMoves = board.getOpenCells()
  t.ok(Array.isArray(possibleMoves), 'Possible moves should be an array')
  t.equal(possibleMoves.length, 3, 'Possible moves should have a length of 3')
  t.deepEqual(possibleMoves, [[2, 0], [2, 1], [2, 2]])
  t.end()
})
