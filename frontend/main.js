import React from 'react'
import ReactDOM from 'react-dom'

import App from 'app'
import { AppContainer } from 'react-hot-loader'

const render = Component => (
	ReactDOM.render(
		<AppContainer>
	    	<Component />
	    </AppContainer>,
	    document.querySelector('#app')
	)
)

render(App)

if(module.hot) 
	module.hot.accept('./app', () => {
		import('app').then((NewApp) => render(NewApp.default))
	})