import { toggleActivePlayer } from '../modules/game'
import { PLACE_MARKER } from '../modules/board'

export default store => next => action => {
  if (action.type === PLACE_MARKER && !store.getState().game.gameOver) {
    store.dispatch(toggleActivePlayer())
  }
  next(action)
}
