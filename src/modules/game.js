const START_GAME = 'fcc-tic-tac-toe/game/START_GAME'
const SET_PLAYER_SIDE = 'fcc-tic-tac-toe/game/SET_PLAYER_SIDE'
const GAME_OVER = 'fcc-tic-tac-toe/game/GAME_OVER'
const TOGGLE_ACTIVE_PLAYER = 'fcc-tic-tac-toe/game/TOGGLE_ACTIVE_PLAYER'
const RESET = 'RESET'

const initialState = {
  initialized: false,
  playerMarker: null,
  aiMarker: null,
  gameOver: false,
  activePlayer: 'x'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        initialized: true
      }
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
    case GAME_OVER:
      return {
        ...state,
        gameOver: true
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export default reducer

export const startGame = () => ({
  type: START_GAME
})

export const setPlayerMarker = (side) => ({
  type: SET_PLAYER_SIDE,
  payload: side
})

export const resetGame = () => ({
  type: RESET
})

export const gameOver = () => ({
  type: GAME_OVER
})

export const toggleActivePlayer = () => ({
  type: TOGGLE_ACTIVE_PLAYER
})
