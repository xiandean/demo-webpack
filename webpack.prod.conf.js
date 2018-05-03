const path = require('path');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const postcssOptions = {
    plugins: (loader) => [
	    require('postcss-import')({
	        root: loader.resourcePath
	    }),
	    require('autoprefixer')({
			browsers: [
				'> 1%',
				'last 2 versions',
				'not ie <= 8',
				'iOS >= 7'
			]
	    })
    ]
};

module.exports = merge(baseWebpackConfig, {
	module: {
		rules: [
		    {
		    	test: /\.css$/,
		    	use: [
		    		{
		    			loader: MiniCssExtractPlugin.loader
		    		},
		    		{
		    			loader: 'css-loader',
		    			options: {
                            minimize: true
                        }
		    		},
		            {
						loader: 'postcss-loader',
						options: postcssOptions
		            }
		    	]
		    },
		    {
		    	test: /\.scss$/,
		    	use: [
		    		{
		    			loader: MiniCssExtractPlugin.loader
		    		},
		    		{
		    			loader: 'css-loader',
		    			options: {
                            minimize: true
                        }
		    		},
		            {
						loader: 'postcss-loader',
						options: postcssOptions
		            },
		            {
		                loader: 'sass-loader'
		            }
		    	]
		    },
		    {
		    	test: /\.less$/,
		    	use: [
		    		{
		    			loader: MiniCssExtractPlugin.loader
		    		},
		    		{
		    			loader: 'css-loader',
		    			options: {
                            minimize: true
                        }
		    		},
		            {
						loader: 'postcss-loader',
						options: postcssOptions
		            },
		            {
		                loader: 'less-loader'
		            }
		    	]
		    },
		    {
		    	test: /\.styl$/,
		    	use: [
		    		{
		    			loader: MiniCssExtractPlugin.loader
		    		},
		    		{
		    			loader: 'css-loader',
		    			options: {
                            minimize: true
                        }
		    		},
		            {
						loader: 'postcss-loader',
						options: postcssOptions
		            },
		            {
		                loader: 'stylus-loader'
		            }
		    	]
		    }
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: '[id].css'
	    }),

		// 内联打包
    	// new HtmlWebpackInlineSourcePlugin()
	]
})
