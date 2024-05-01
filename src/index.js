import React from 'react'
import ReactDOM from 'react-dom'

import { store } from './redux/store'
import { Provider } from 'react-redux'
import BrowserRoutes from './BrowserRoutes'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRoutes />
  </Provider>,
  document.getElementById('root')
)
