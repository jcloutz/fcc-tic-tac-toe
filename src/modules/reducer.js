import { combineReducers } from 'redux'
import gameState from './gameState'
// import game from './game'
import board from './board'
import ai from './ai'

export default combineReducers({
  gameState,
  // game,
  board,
  ai
})
