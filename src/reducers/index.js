import { combineReducers } from 'redux'
import game from './game'
import playerCount from './player-count'
import playerSide from './player-side'
import board from './board-reducer'

const ticTacToe = combineReducers({
  game,
  playerCount,
  playerSide,
  board
})

export default ticTacToe
