export const SET_PLAYER_SIDE = 'fcc-tic-tac-toe/game/SET_PLAYER_SIDE'
export const TOGGLE_ACTIVE_PLAYER = 'fcc-tic-tac-toe/game/TOGGLE_ACTIVE_PLAYER'
const RESET = 'RESET'

const initialState = {
  playerMarker: null,
  aiMarker: null,
  activePlayer: 'x'
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
