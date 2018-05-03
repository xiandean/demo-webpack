const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const postcssOptions = {
	sourceMap: true,
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
		    			loader: 'style-loader',
		    			options: {
		    				sourceMap: true
		    			}
		    		},
		    		{
		    			loader: 'css-loader',
		    			options: {
		    				sourceMap: true
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
		    			loader: 'style-loader',
		    			options: {
		    				sourceMap: true
		    			}
		    		},
		    		{
		    			loader: 'css-loader',
		    			options: {
		    				sourceMap: true
		    			}
		    		},
		            {
						loader: 'postcss-loader',
						options: postcssOptions
		            },
		            {
		                loader: 'sass-loader',
		                options: {
		                	sourceMap: true,
		                    outputStyle: 'expanded'
		                }
		            }
		    	]
		    },
		    {
		    	test: /\.less$/,
		    	use: [
		    		{
		    			loader: 'style-loader',
		    			options: {
		    				sourceMap: true
		    			}
		    		},
		    		{
		    			loader: 'css-loader',
		    			options: {
		    				sourceMap: true
		    			}
		    		},
		            {
						loader: 'postcss-loader',
						options: postcssOptions
		            },
		            {
		                loader: 'less-loader',
		    			options: {
		    				sourceMap: true
		    			}
		            }
		    	]
		    },
		    {
		    	test: /\.styl$/,
		    	use: [
		    		{
		    			loader: 'style-loader',
		    			options: {
		    				sourceMap: true
		    			}
		    		},
		    		{
		    			loader: 'css-loader',
		    			options: {
		    				sourceMap: true
		    			}
		    		},
		            {
						loader: 'postcss-loader',
						options: postcssOptions
		            },
		            {
		                loader: 'stylus-loader',
		    			options: {
		    				sourceMap: true
		    			}
		            }
		    	]
		    }
		]
	},
	plugins: [
    	new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		//设置基本目录结构
		// contentBase: path.resolve(__dirname, 'dist'),
		//服务器的IP地址，可以使用IP也可以使用localhost
		host: 'localhost',
		//配置服务端口号
		port: 8080,
		//服务端压缩是否开启
		compress: true,
		inline: true,
		hot: true,
		open: false,
		// noInfo: true,
		historyApiFallback: true,
		proxy: {}
	},
})
