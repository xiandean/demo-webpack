const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/js/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
		        test: /\.html$/,
		        use: 'html-loader'
		    },
		    {
		        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
		        use: {
					loader: 'url-loader',
					options: {
						limit: 1000,
						name: 'images/[name].[ext]'
					}
		        }
		    }
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/index.html'),
			// title: 'this is index.html',
			inject: 'body', // 'head', 'body', false
			// hash: true,  //为静态资源生成hash值
			// chunks: ['main', 'common'],
			// excludeChunks: ['list'],
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			inlineSource: '\.(js|css)$'
		}),

    	// copy custom static assets
	    new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src/static'),
				to: 'static',
				ignore: ['.*']
			}
	    ]),
	]
}
