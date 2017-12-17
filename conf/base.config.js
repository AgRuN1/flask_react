const webpack = require('webpack')
const path = require('path')

const rootdir = path.dirname(__dirname)

const frontend_dir = path.join(rootdir, 'frontend')
const public_dir = path.join(rootdir, 'app', 'web', 'js')
const node_modules_dir = path.join(rootdir, 'node_modules')

module.exports = {
	context: frontend_dir,
	output: {
		path: public_dir,
		publicPath: '/static/js/',
		filename: '[name].min.js',
		chunkFilename: '[name]-chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({resource}) => /node_modules/.test(resource)
		})
	],
	resolve: {
		modules: [
			node_modules_dir,
			frontend_dir
		]
	}
}