import { TOGGLE_ACTIVE_PLAYER } from '../modules/game'
import { placeMarker } from '../modules/board'

export default store => next => action => {
  const state = store.getState()
  if (action.type === TOGGLE_ACTIVE_PLAYER && state.game.activePlayer !== state.game.aiMarker) {
    console.log('ais turn')

    setTimeout(() => {
      store.dispatch(placeMarker({
        ...state.ai,
        marker: state.game.aiMarker
      }))
      console.log('ai is playing now..')
    }, 1000)
  } else if (action.type === TOGGLE_ACTIVE_PLAYER) {
    console.log('players turn')
  }

  next(action)
}
