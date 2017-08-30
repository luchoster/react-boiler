import React        from 'react'
import { render }   from 'react-dom'
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware
}                            from 'redux'
import Thunk                 from 'redux-thunk'
import MuiThemeProvider      from 'material-ui/styles/MuiThemeProvider'
import ReactTouchTap         from 'react-tap-event-plugin'
import App                   from './app'
import registerServiceWorker from './registerServiceWorker'
import Reducers              from './reducers/'

import './style/index.css'

ReactTouchTap()

const store = createStore(
  Reducers,
  applyMiddleware(Thunk)
)

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
