import Ai from '../lib/ai-player'
import { gameOver } from '../modules/game'
import { PLACE_MARKER, INITIALIZE_BOARD, getNewBoard } from '../modules/board'
import { setNextMove } from '../modules/ai'

export default store => next => action => {
  if (action.type === PLACE_MARKER || action.type === INITIALIZE_BOARD) {
    const state = store.getState()

    // create snapshot of new board state with payload to test if the next state will
    // be the end of the game.
    const { row, cell, marker } = action.payload
    // console.log('----------------------')
    // console.log(action.type, row, cell, marker)
    // console.log('placing marker', state.board)
    let newBoard = getNewBoard(state.board, row, cell, marker)
    let game = new Ai(state.game.activePlayer, newBoard)

    // if game is over due to a win or there are not more moves then trigger then
    // game over action to end the game for the player.
    if (game.gameOver() || game.getNextMoves().length === 0) {
      store.dispatch(gameOver(game.winner))
    } else {
      store.dispatch(setNextMove(game.move()))
    }
  }
  return next(action)
}
