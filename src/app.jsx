import React from 'react'
import { render } from 'react-dom'
import Game from './components/Game'
import { Provider } from 'react-redux'
import store from './store'
require('./style/app.styl')

const App = () => (
  <Provider store={store}>
    <Game />
  </Provider>
)

render(<App />, document.getElementById('root'))
