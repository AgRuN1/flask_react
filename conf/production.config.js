const webpack = require('webpack')
const path = require('path')

const rootdir = path.join(path.dirname(__dirname))

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: [
		'babel-polyfill',
		'./main.js'
	],
	module: {
		rules: [
			{
				test: /\.sass$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/,
			cssProcessorOptions: {discardComments: {removeAll: true}}
		}),
		new ExtractTextPlugin(path.join('..', 'css', 'style.css')),
		new CleanPlugin(['js/*', 'css/*'], {
			root: path.join(rootdir, 'app', 'web')
		})
	]
}