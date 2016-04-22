import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { render } from 'react-dom'
import Layout from './components/Layout'
import StartPage from './containers/StartPage'
import PlayerCountPage from './containers/PlayerCountPage'
import ChooseSidePage from './containers/ChooseSidePage'
import { createStore } from 'redux'
import ticTacToe from './reducers'
import { Provider } from 'react-redux'

require('./style/app.styl')

const store = createStore(ticTacToe, {}, window.devToolsExtension ? window.devToolsExtension() : undefined)

let requireInitialization = (nextState, replace) => {
  const { game, playerCount } = store.getState()

  if (game === 'GAME_PENDING') {
    replace({
      pathname: '/',
      state: { pathname: nextState.location.pathName }
    })
  }
}

const App = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={StartPage} />
        <Route path='/players' component={PlayerCountPage} onEnter={requireInitialization}/>
        <Route path='/choose-side' component={ChooseSidePage} onEnter={requireInitialization}/>
      </Route>
    </Router>
  </Provider>
)

render(<App />, document.getElementById('root'))
