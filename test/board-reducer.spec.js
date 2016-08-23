const test = require('tape')
import {
        initialState,
        getWinner,
        isWinningLine,
        getBestMove,
        getWinningBoard
      } from '../src/modules/game'

const initialTestState = {
  ...initialState,
  player1: 'x',
  player2: 'o'
}

test('isWinningLine() with 1 mark', (t) => {
  const lineContents = [null, 'x', null]
  const test = isWinningLine('x', lineContents)

  t.equal(test, false, 'Should be false')
  t.end()
})

test('isWinningLine() with 2 similar marks', (t) => {
  const lineContents = ['x', 'x', null]
  const test = isWinningLine('x', lineContents)

  t.equal(test, false, 'Should be false')
  t.end()
})

test('isWinningLine() with 3 mixed marks', (t) => {
  const lineContents = ['x', 'x', 'o']
  const test = isWinningLine('x', lineContents)

  t.equal(test, false, 'Should be false')
  t.end()
})

test('isWinningLine() with 3 similar marks', (t) => {
  const lineContents = ['x', 'x', 'x']
  const test = isWinningLine('x', lineContents)

  t.equal(test, true, 'Should be false')
  t.end()
})

test('winningColumn() with 0 marks', (t) => {
  const board = [
    [null, 'x', null],
    [null, 'x', null],
    [null, 'x', null]
  ]

  const test = getWinner(board, 'x', 'o')

  t.deepEqual(test.winningLine, [[0, 1], [1, 1], [2, 1]], 'Should equal [[0,1], [1, 1], [2, 1]]')
  t.end()
})

test('getWinner() with 0 marks', (t) => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  const test = getWinner(board, 'x', 'o')

  t.equal(test, false, 'Should equal false')
  t.end()
})

test('getWinner() with 3 marks', (t) => {
  const board = [
    ['x', null, null],
    [null, 'x', null],
    [null, null, 'x']
  ]

  const test = getWinner(board, 'x', 'o')

  t.equal(test.winner, 'x', 'Should equal x')
  t.deepEqual(test.winningLine, [[0, 0], [1, 1], [2, 2]], 'Should equal [[0, 0], [1, 1], [2, 2]]')
  t.end()
})

test('getBestMove() should block', (t) => {
  const testState = {
    ...initialTestState,
    player1: 'x',
    player2: 'o',
    active: 'o',
    board: [
      ['x', null, 'x'],
      ['o', null, null],
      [null, null, null]
    ]
  }

  const test = getBestMove(testState)

  t.deepEqual(test, [0, 1], 'Should equal [0, 1]')
  t.end()
})

test('getBestMove() should win', (t) => {
  const testState = {
    ...initialTestState,
    player1: 'x',
    player2: 'o',
    active: 'o',
    board: [
      ['x', null, 'x'],
      ['o', null, 'o'],
      ['x', null, null]
    ]
  }

  const test = getBestMove(testState)

  t.deepEqual(test, [1, 1], 'Should equal [1, 1]')
  t.end()
})

test('getBestMove() should block', (t) => {
  const testState = {
    ...initialTestState,
    player1: 'o',
    player2: 'x',
    active: 'x',
    board: [
      ['o', null, 'o'],
      [null, null, null],
      ['x', null, null]
    ]
  }

  const test = getBestMove(testState)

  t.deepEqual(test, [0, 1], 'Should equal [0, 1]')
  t.end()
})

test('getBestMove() should complete board', (t) => {
  const testState = {
    ...initialTestState,
    player1: 'x',
    player2: 'o',
    active: 'o',
    board: [
      ['o', 'o', 'x'],
      ['x', 'x', 'o'],
      ['o', 'x', null]
    ]
  }

  const test = getBestMove(testState)

  t.deepEqual(test, [2, 2], 'Should equal [2, 2]')
  t.end()
})

test('getWinningBoard() should return new board with winning line', (t) => {
  const winningLine = [[0, 0], [1, 1], [2, 2]]
  const winner = 'o'

  const winningBoard = [
    ['o', null, null],
    [null, 'o', null],
    [null, null, 'o']
  ]
  const test = getWinningBoard(winningLine, winner)

  t.deepEqual(test, winningBoard, 'Should be equal')
  t.end()
})
