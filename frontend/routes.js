import React from 'react'

import {
	Route,
	Switch
}from 'react-router-dom'

import { 
	ConnectedRouter as Router 
} from 'react-router-redux'

import { Helmet } from 'react-helmet'
import Loader from 'utils/Loader'
import storeManager from 'utils/storeManager'

import Layout from 'elements/Layout'

const AsyncHome = Loader(() => import('modules/Login'))

class About extends React.Component{

	componentWillMount(){
		storeManager.getStore().dispatch({
			type: 'SET_TITLE',
			payload: {
				title_page: 'Counter - About',
				title_head: 'About'
			}
		})
	}

	render(){
		return(
			<div>
				<p>About</p>
			</div>
		)
	}
}

const Routes = ({history}) => {
	return(
		<Router history={history}>
			<Layout>
				<Switch>
					<Route exact path='/' component={AsyncHome} />
					<Route path='/about' component={About} />
					<Route path='*' render={() => {
						location = '/404'
					}}
					/>
				</Switch>
			</Layout>
		</Router>
	)
}

export default Routes