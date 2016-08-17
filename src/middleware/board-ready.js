import { BOARD_READY, RESET_BOARD, setBoardClickable, boardReady } from '../modules/board'
import { aiPlay } from '../modules/ai'

export default store => next => action => {
  const state = store.getState()
  if (action.type === BOARD_READY) {
    // if the board is declared ready and the player is up first then set the board to clickable.
    if (state.game.activePlayer === state.game.playerMarker) {
      store.dispatch(setBoardClickable(true))
    } else { // queue the ai to play
      setTimeout(() => {
        store.dispatch(aiPlay())
      }, 1500)
    }
  } else if (action.type === RESET_BOARD) {
    setTimeout(() => {
      store.dispatch(boardReady())
    }, 1500)
  }

  return next(action)
}