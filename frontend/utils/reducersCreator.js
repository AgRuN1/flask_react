import {combineReducers} from 'redux'

import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import titleReducer from './titleReducer'


const createReducer = (currentPage = {}) => combineReducers({
	...currentPage,
	titles: titleReducer,
	form: formReducer,
	router: routerReducer
})

export default createReducer