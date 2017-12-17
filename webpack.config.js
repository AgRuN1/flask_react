const webpack = require('webpack')
const merge = require('webpack-merge')

const env = process.env.NODE_ENV === 'production' ? 
	'production' : 'development'

module.exports = merge(
	require('./conf/base.config.js'),
	require(`./conf/${env}.config.js`)
)