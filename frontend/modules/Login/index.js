import React from 'react'
import { connect } from 'react-redux'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'graphql-tag'

import { 
	Field, 
	reduxForm, 
	formValueSelector 
} from 'redux-form'

import storeManager from 'utils/storeManager'

import {
	Paper,
	Divider,
	RaisedButton,
	FontIcon
}from 'material-ui'
import { greenA700 } from 'material-ui/styles/colors'

import renderInputField from 'elements/textField'
import validate from './validation'

const loginForm = 'login-form'

const networkInterface = createNetworkInterface({
	uri: '/api'
})
const client = new ApolloClient({
	networkInterface,
	connectToDevTools: true
})

const selector = formValueSelector(loginForm)

const mapStateToProps = state => {
	const login = selector(state, 'login')
	const password = selector(state, 'password')

	return {
		login,
		password
	}
}


@connect(mapStateToProps)
@reduxForm({
	form: loginForm,
	validate
})
class Login extends React.Component{

	constructor(props){
		super(props)

		this.state = {errors: false}
	}

	componentWillMount(){
		storeManager.getStore().dispatch({
			type: 'SET_TITLE',
			payload: {
				title_page: 'Админка - Вход',
				title_head: 'Вход'
			}
		})
	}

	login(){
		const { login, password } = this.props

		client.query({
			query: gql`
				query{
					admin(login: "${login}", password: "${password}")
				}
			`
		})
		.then(({data: {admin}} )=> {
			if(admin != 'ok')
				throw {
					message: 'Неверный логин или пароль'
				}
		})
		.then(() => {
			console.log('loggined')
		})
		.catch(err => {
			const message = err.message || 'Что-то пошло не так...'
			this.setState({errors: message})
		})
	}

	render(){
		const paperStyle = {
			display: 'inline-block',
			padding: '25px',
			marginLeft: '50%',
			marginTop: '50px',
			transform: 'translateX(-50%)'
		}

		const {invalid} = this.props
		const {errors} = this.state
		
		return(
			<Paper style={paperStyle}>
				<h2 style={{
					textAlign: 'center'
				}}>Авторизация</h2>
				{errors && <p className='error'>{errors}</p>}

				<div>
					<Field 
						name='login' 
						component={renderInputField} 
						label='Логин'
					/>
				</div>

				<div>
					<Field 
						name='password' 
						component={renderInputField} 
						label='Пароль'
						type='password'
					/>
				</div>

				<div>
					<RaisedButton
						label='Войти'
						backgroundColor={greenA700}
						labelColor='#ffffff'
						type='submit'
						disabled={invalid}
						icon={<FontIcon className="material-icons">directions</FontIcon>}
						onClick={() => this.login()}
					/>
				</div>
			</Paper>
		)
	}
}

export default Login