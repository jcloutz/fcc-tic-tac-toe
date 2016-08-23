import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './modules/reducer'
import thunk from 'redux-thunk'
// import togglePlayer from './middleware/toggle-player'
import boardReady from './middleware/board-ready'
// import handleAIPlay from './middleware/handle-ai-play'
// import checkGameOver from './middleware/check-game-over'

const store = createStore(reducer, {},
  compose(
    applyMiddleware(
      thunk,
      boardReady
      // checkGameOver,
      // handleAIPlay
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
export default store
