import { createStore } from 'redux'
import reducer from './modules/reducer'

const store = createStore(reducer, {}, window.devToolsExtension ? window.devToolsExtension() : undefined)

export default store
