import { combineReducers } from 'redux'
import game from './game'
import playerCount from './player-count'
import playerSide from './player-side'

const ticTacToe = combineReducers({
  game,
  playerCount,
  playerSide
})

export default ticTacToe
