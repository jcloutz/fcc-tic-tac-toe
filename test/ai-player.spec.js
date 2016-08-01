const test = require('tape')
const AIPlayer = require('../src/lib/ai-player')

test('evaluateLine() with 0 marks', (t) => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  const player = new AIPlayer('X', board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 1, 'Should equal 1')
  t.end()
})

test('evaluateLine() with 1 friendly mark', (t) => {
  const board = [
    ['X', null, null],
    [null, null, null],
    [null, null, null]
  ]

  const player = new AIPlayer('X', board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 1, 'Should equal 1')
  t.end()
})

test('evaluateLine() with 1 friendly mark & 1 enemy mark', (t) => {
  const board = [
    ['X', 'O', null],
    [null, null, null],
    [null, null, null]
  ]

  const player = new AIPlayer('X', board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 0, 'Should equal 0')
  t.end()
})

test('evaluateLine() with 2 friendly marks & 1 empty mark', (t) => {
  const board = [
    ['X', 'X', 'O'],
    [null, null, null],
    [null, null, null]
  ]

  const player = new AIPlayer('X', board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 0, 'Should equal 0')
  t.end()
})

test('evaluateLine() with 2 friendly marks', (t) => {
  const board = [
    ['X', 'X', null],
    [null, null, null],
    [null, null, null]
  ]

  const player = new AIPlayer('X', board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 10, 'Should equal 10')
  t.end()
})

test('evaluateLine() with 2 enemy marks', (t) => {
  const board = [
    ['O', null, 'O'],
    [null, null, null],
    [null, null, null]
  ]

  const player = new AIPlayer('X', board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), -10, 'Should equal -10')
  t.end()
})

test('evaluateLine() with 3 friendly marks', (t) => {
  const board = [
    ['X', 'X', 'X'],
    [null, null, null],
    [null, null, null]
  ]

  const player = new AIPlayer('X', board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), 100, 'Should equal 100')
  t.end()
})

test('evaluateLine() with 3 enemy marks', (t) => {
  const board = [
    ['O', 'O', 'O'],
    [null, null, null],
    [null, null, null]
  ]

  const player = new AIPlayer('X', board)

  t.equal(player.evaluateLine([[0, 0], [0, 1], [0, 2]]), -100, 'Should equal -100')
  t.end()
})

test('evaluate blocking move for X', (t) => {
  const board = [
    ['O', null, 'O'],
    [null, null, null],
    ['X', null, null]
  ]

  const player = new AIPlayer('X', board, 4)

  t.deepEqual(player.move(), [0, 1], 'Should return [0, 1] as a blocking move')
  t.end()
})

test('evaluate blocking move for X', (t) => {
  const board = [
    ['O', null, 'O'],
    [null, null, null],
    ['X', null, 'X']
  ]

  const player = new AIPlayer('X', board, 4)

  t.deepEqual(player.move(), [2, 1], 'Should return [2, 1] as a winning move')
  t.end()
})

test('evaluate blocking move for X', (t) => {
  const board = [
    ['X', null, null],
    [null, 'O', null],
    [null, 'O', null]
  ]

  const player = new AIPlayer('X', board, 4)

  t.deepEqual(player.move(), [0, 1], 'Should return [0, 1] as a blocking move')
  t.end()
})
