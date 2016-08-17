export const NEXT_GAME_STATE = 'fcc-tic-tac-toe/gameState/NEXT_GAME_STATE'
export const PREV_GAME_STATE = 'fcc-tic-tac-toe/gameState/PREV_GAME_STATE'
export const SET_GAME_STATE = 'fcc-tic-tac-toe/gameState/SET_GAME_STATE'
const RESET = 'RESET'

export const gameStates = {
  GAME_WANT_TO_PLAY: 'GAME_WANT_TO_PLAY',
  GAME_CHOOSE_SIDE: 'GAME_CHOOSE_SIDE',
  GAME_PLAY: 'GAME_PLAY',
  GAME_OVER: 'GAME_OVER'
}

const gameStateOrder = [
  gameStates.GAME_WANT_TO_PLAY,
  gameStates.GAME_CHOOSE_SIDE,
  gameStates.GAME_PLAY,
  gameStates.GAME_OVER
]

const initialState = gameStateOrder[0]

export default (state = initialState, action) => {
  switch (action.type) {
    case NEXT_GAME_STATE:
      return gameStateOrder[gameStateOrder.indexOf(state) + 1]
    case PREV_GAME_STATE:
      return gameStateOrder[gameStateOrder.indexOf(state) - 1]
    case SET_GAME_STATE:
      return action.payload
    case RESET:
      return initialState
    default:
      return state
  }
}

export const nextGameState = () => ({
  type: NEXT_GAME_STATE
})

export const prevGameState = () => ({
  type: PREV_GAME_STATE
})

export const setGameState = (desiredState) => ({
  type: SET_GAME_STATE,
  payload: desiredState
})

export const resetGame = () => ({
  type: RESET
})
