import { SET_PLAYER_SIDE, initGame } from '../modules/game'
import { initBoard } from '../modules/board'

export default store => next => action => {
  if (action.type === SET_PLAYER_SIDE) {
    console.log('initializing')
    store.dispatch(initGame())
    store.dispatch(initBoard())
  }
  next(action)
}
