import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { render } from 'react-dom'
import Layout from './components/Layout'
import InitialPrompt from './components/InitialPrompt'
import PlayerCountPrompt from './components/PlayerCountPrompt'
require('./style/app.styl')

const App = () => (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={InitialPrompt} />
      <Route path='/players' component={PlayerCountPrompt} />
    </Route>
  </Router>
)

render(<App />, document.getElementById('root'))
