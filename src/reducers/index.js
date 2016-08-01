import { combineReducers } from 'redux'
import game from './game'
import playerSide from './player-side'
import board from './board-reducer'

const ticTacToe = combineReducers({
  game,
  playerSide,
  board
})

export default ticTacToe
