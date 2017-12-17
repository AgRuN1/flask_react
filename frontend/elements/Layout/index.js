import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'

import R from 'ramda'
import { 
	Link,
	withRouter
} from 'react-router-dom'

import './layout.sass'
import { 
	AppBar,
	Drawer,
	MenuItem,
	Subheader
} from 'material-ui'
import {greenA700, grey300} from 'material-ui/styles/colors'
import {Helmet} from 'react-helmet'

class Layout extends React.Component{

	constructor(props){
		super(props)
		const pathname = R.pathOr('/', ['location', 'pathname'])(props)

		this.pathname = pathname
		this.state = {
			open: false
		}

		this.closeDrawer = this.closeDrawer.bind(this)
		this.openDrawer = this.openDrawer.bind(this)
	}

	componentDidUpdate(){
		const pathname = R.pathOr('/', ['location', 'pathname'])(this.props)
		if(pathname != this.pathname){
			this.pathname = pathname
			this.closeDrawer()
		}
	}

	openDrawer(){
		this.setState({open: true})
	}

	closeDrawer(){
		this.setState({open: false})
	}

	render(){
		const styles = {
			backgroundColor: greenA700
		}
		const containerStyles = {
			backgroundColor: grey300
		}
		const {children, title_page, title_head} = this.props

		return(
			<div>
				<Helmet>
					<title>{title_head}</title>
				</Helmet>
				<AppBar 
					title={title_page}
					style={styles}
					onLeftIconButtonTouchTap={this.openDrawer}
				/>
				 <Drawer 
				 	className='nav'
				 	containerStyle={containerStyles}
				 	open={this.state.open}
				 	docked={false}
				 	onRequestChange={this.closeDrawer}
				 >
				<Subheader>
					АДМИНКА БОТА
				</Subheader>
				<MenuItem>
					<Link to='/'>
						Home
					</Link>
				</MenuItem>
				<MenuItem>
					<Link to='/about'>
						About
					</Link>
				</MenuItem>
		        </Drawer>
				{children}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	title_head: state.titles.title_head,
	title_page: state.titles.title_page
})

export default compose(
	withRouter,
	connect(mapStateToProps)
)(Layout)