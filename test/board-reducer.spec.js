const test = require('tape')
import { winningRow,
        winningColumn,
        winningDiagonal,
        winningReverseDiagonal,
        checkLine,
        hasWon
      } from '../src/modules/board'

test('checkLine() with 1 mark', (t) => {
  const lineContents = [null, 'x', null]
  const test = checkLine('x', lineContents)

  t.equal(test, false, 'Should be false')
  t.end()
})

test('checkLine() with 2 similar marks', (t) => {
  const lineContents = ['x', 'x', null]
  const test = checkLine('x', lineContents)

  t.equal(test, false, 'Should be false')
  t.end()
})

test('checkLine() with 3 mixed marks', (t) => {
  const lineContents = ['x', 'x', 'o']
  const test = checkLine('x', lineContents)

  t.equal(test, false, 'Should be false')
  t.end()
})

test('checkLine() with 3 similar marks', (t) => {
  const lineContents = ['x', 'x', 'x']
  const test = checkLine('x', lineContents)

  t.equal(test, true, 'Should be false')
  t.end()
})

test('winningRow() with 0 marks', (t) => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  const test = winningRow('x', board)

  t.deepEqual(test, [], 'Should equal empty array')
  t.end()
})

test('winningRow() with 1 winning row', (t) => {
  const board = [
    ['x', 'x', 'x'],
    [null, null, null],
    [null, null, null]
  ]

  const test = winningRow('x', board)

  t.deepEqual(test, [[0, 0], [0, 1], [0, 2]], 'Should equal [[0, 0], [0, 1], [0, 2]]')
  t.end()
})

test('winningColumn() with 0 marks', (t) => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  const test = winningColumn('x', board)

  t.deepEqual(test, [], 'Should equal empty array')
  t.end()
})

test('winningColumn() with 0 marks', (t) => {
  const board = [
    [null, 'x', null],
    [null, 'x', null],
    [null, 'x', null]
  ]

  const test = winningColumn('x', board)

  t.deepEqual(test, [[0, 1], [1, 1], [2, 1]], 'Should equal [[0,1], [1, 1], [2, 1]]')
  t.end()
})

test('winningDiagonal() with 0 marks', (t) => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  const test = winningDiagonal('x', board)

  t.deepEqual(test, [], 'Should equal []')
  t.end()
})

test('winningDiagonal() with 3 marks', (t) => {
  const board = [
    ['x', null, null],
    [null, 'x', null],
    [null, null, 'x']
  ]

  const test = winningDiagonal('x', board)

  t.deepEqual(test, [[0, 0], [1, 1], [2, 2]], 'Should equal [[0, 0], [1, 1], [2, 2]]')
  t.end()
})

test('winningReverseDiagonal() with 0 marks', (t) => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  const test = winningReverseDiagonal('x', board)

  t.deepEqual(test, [], 'Should equal []')
  t.end()
})

test('winningReverseDiagonal() with 3 marks', (t) => {
  const board = [
    [null, null, 'x'],
    [null, 'x', null],
    ['x', null, null]
  ]

  const test = winningReverseDiagonal('x', board)

  t.deepEqual(test, [[0, 2], [1, 1], [2, 0]], 'Should equal [[0, 2], [1, 1], [2, 0]]')
  t.end()
})

test('hasWon() for x on losing board', (t) => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  const test = hasWon('x', board)

  t.equal(test, false, 'Should be false')
  t.end()
})

test('hasWon() for x on winning board', (t) => {
  const board = [
    [null, null, 'x'],
    [null, 'x', null],
    ['x', null, null]
  ]

  const test = hasWon('x', board)

  t.deepEqual(test, [[0, 2], [1, 1], [2, 0]], 'Should equal [[0, 2], [1, 1], [2, 0]]')
  t.end()
})
