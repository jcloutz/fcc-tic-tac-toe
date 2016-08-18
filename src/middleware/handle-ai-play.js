import { AI_PLAY } from '../modules/ai'
import { placeMarker } from '../modules/board'
import Ai from '../lib/ai-player'

export default store => next => action => {
  if (action.type === AI_PLAY) {
    const state = store.getState()
    const { cells } = state.board
    console.log(cells[0][0], cells[0][1], cells[0][2])
    console.log(cells[1][0], cells[1][1], cells[1][2])
    console.log(cells[2][0], cells[2][1], cells[2][2])
    let game = new Ai(state.game.aiMarker, state.board.cells)
    const nextMove = game.move()
    store.dispatch(placeMarker({ row: nextMove[0], cell: nextMove[1], marker: state.game.aiMarker }))
  }
  return next(action)
}
// export default store => next => action => {
//   const state = store.getState()
//   console.log(action.type, state.game.activePlayer, state.game.aiMarker)
//   if (action.type === TOGGLE_ACTIVE_PLAYER && state.game.activePlayer !== state.game.aiMarker) {
//     console.log('ais turn')
//     aiPlay(store.dispatch, state.ai.row, state.ai.cell, state.game.aiMarker)
//   } else if (action.type === BOARD_READY && state.game.activePlayer === state.game.aiMarker) {
//     console.log('ais turn')
//
//     let game = new Ai(state.game.aiMarker, state.board.cells)
//     const nextMove = game.move()
//     aiPlay(store.dispatch, nextMove[0], nextMove[1], state.game.aiMarker)
//   } else if (action.type === TOGGLE_ACTIVE_PLAYER || action.type === BOARD_READY) {
//     console.log('players turn')
//     store.dispatch(setBoardClickable(true))
//   }
//
//   next(action)
// }

const aiPlay = (dispatch, row, cell, marker) => {
  setTimeout(() => {
    dispatch(placeMarker({
      row,
      cell,
      marker
    }))
    console.log('ai is playing now..')
  }, 1000)
}
