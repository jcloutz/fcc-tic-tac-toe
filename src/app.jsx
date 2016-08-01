import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { render } from 'react-dom'
import Layout from './components/Layout'
import StartPage from './containers/StartPage'
import ChooseSidePage from './containers/ChooseSidePage'
import BoardPage from './containers/BoardPage'
import { Provider } from 'react-redux'
import store from './store'
require('./style/app.styl')

let requireInitialization = (nextState, replace) => {
  const { game } = store.getState()

  if (!game.initialized) {
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
        <Route path='/choose-side' component={ChooseSidePage} onEnter={requireInitialization} />
        <Route path='/play' component={BoardPage} onEnter={requireInitialization} />
      </Route>
    </Router>
  </Provider>
)

render(<App />, document.getElementById('root'))
