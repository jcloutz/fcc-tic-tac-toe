import { RESET_BOARD } from './board'

export const SET_PLAYER_SIDE = 'fcc-tic-tac-toe/game/SET_PLAYER_SIDE'
export const TOGGLE_ACTIVE_PLAYER = 'fcc-tic-tac-toe/game/TOGGLE_ACTIVE_PLAYER'
export const SET_WINNER = 'fcc-tic-tac-toe/game/SET_WINNER'
const RESET = 'RESET'

const initialState = {
  playerMarker: null,
  aiMarker: null,
  activePlayer: 'x',
  winner: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_SIDE:
      return {
        ...state,
        playerMarker: action.payload,
        aiMarker: action.payload === 'x' ? 'o' : 'x'
      }
    case TOGGLE_ACTIVE_PLAYER:
      return {
        ...state,
        activePlayer: state.activePlayer === 'x' ? 'o' : 'x'
      }
    case SET_WINNER:
      return {
        ...state,
        winner: action.payload
      }
    case RESET_BOARD:
      return {
        ...state,
        winner: null,
        activePlayer: 'x'
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export default reducer

export const setPlayerMarker = (side) => ({
  type: SET_PLAYER_SIDE,
  payload: side
})

export const resetGame = () => ({
  type: RESET
})

export const toggleActivePlayer = () => ({
  type: TOGGLE_ACTIVE_PLAYER
})

export const setWinner = (marker) => ({
  type: SET_WINNER,
  payload: marker
})
