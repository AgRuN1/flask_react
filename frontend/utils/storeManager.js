import { 
	createStore as storeCreator, 
	applyMiddleware
} from 'redux'

import createReducer from 'utils/reducersCreator'
import { composeWithDevTools } from 'redux-devtools-extension'

function StoreManager(){
	let store
	function createStore(middlewares){
		if(!store)
			store = storeCreator(createReducer(), 
			composeWithDevTools(applyMiddleware(...middlewares)))
		return store 
	}

	function setReducers(reducers){
		store.replaceReducer(createReducer(reducers))
	}

	function getStore(){
		return store
	}

	this.createStore = createStore
	this.setReducers = setReducers
	this.getStore = getStore
}

export default new StoreManager()