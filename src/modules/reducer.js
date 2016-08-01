import { combineReducers } from 'redux'
import game from './game'
import board from './board'
import ai from './ai'

export default combineReducers({
  game,
  board,
  ai
})
