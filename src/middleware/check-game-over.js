import Ai from '../lib/ai-player'
import { setGameState, gameStates } from '../modules/gameState'
import { PLACE_MARKER, getNewBoard, setBoardClickable } from '../modules/board'
import { toggleActivePlayer, setWinner } from '../modules/game'
import { aiPlay } from '../modules/ai'

export default store => next => action => {
  if (action.type === PLACE_MARKER) {
    // will next move end the game?
    const state = store.getState()
    const { row, cell, marker } = action.payload
    let newBoard = getNewBoard(state.board.cells, row, cell, marker)
    let game = new Ai(state.game.activePlayer, newBoard)

    if (game.gameOver() || game.getNextMoves().length === 0) {
      store.dispatch(setWinner(game.winner))
      store.dispatch(setGameState(gameStates.GAME_OVER))
    } else {
      // if ai player isn't active then queue their next move is 1.5 seconds
      if (state.game.aiMarker !== state.game.activePlayer) {
        setTimeout(() => {
          store.dispatch(aiPlay())
        }, 1500)
      } else {
        store.dispatch(setBoardClickable(true))
      }
      // store.dispatch(setNextMove(game.move()))
      store.dispatch(toggleActivePlayer())
    }
  }
  return next(action)
}
// export default store => next => action => {
//   if (action.type === PLACE_MARKER || action.type === INITIALIZE_BOARD) {
//     const state = store.getState()
//
//     // create snapshot of new board state with payload to test if the next state will
//     // be the end of the game.
//     const { row, cell, marker } = action.payload
//     // console.log('----------------------')
//     // console.log(action.type, row, cell, marker)
//     // console.log('placing marker', state.board)
//     let newBoard = getNewBoard(state.board.cells, row, cell, marker)
//     let game = new Ai(state.game.activePlayer, newBoard)
//
//     // if game is over due to a win or there are not more moves then trigger then
//     // game over action to end the game for the player.
//     if (game.gameOver() || game.getNextMoves().length === 0) {
//       store.dispatch(setGameState(gameStates.GAME_OVER))
//     } else {
//       store.dispatch(setNextMove(game.move()))
//     }
//   }
//   return next(action)
// }
