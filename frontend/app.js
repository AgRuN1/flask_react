import React from 'react'
import { Provider } from 'react-redux'

import {
	routerMiddleware as createRouterMiddleware
} from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

import Routes from 'routes'
import storeManager from 'utils/storeManager'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const browserHistory = createHistory()
const routerMiddleware = createRouterMiddleware(browserHistory)
const store = storeManager.createStore([routerMiddleware, thunk])

const App = () => (
	<Provider store={store}>
    	<MuiThemeProvider>
        	<Routes history={browserHistory} />
        </MuiThemeProvider>
    </Provider>
)

export default App