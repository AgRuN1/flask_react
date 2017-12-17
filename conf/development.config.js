const webpack = require('webpack')
const path = require('path')

const rootdir = path.dirname(__dirname)

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./main.js'
	],
	module: {
		rules: [
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),   
		new webpack.NamedModulesPlugin(),
		new webpack.SourceMapDevToolPlugin({
			name: '[name].js.map',
			exclude: ['vendor.min.js']
		})
	],
	watch: true,
	watchOptions: {
	    aggregateTimeout: 300,
	    poll: 1000,
	},
	devServer: {
		proxy: {
			'/': 'http://localhost:5000'
		},
		overlay: {
			warnings: false,
			errors: true
		},
		hot: true
	}
}