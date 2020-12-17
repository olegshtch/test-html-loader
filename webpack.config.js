'use strict'
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader')
const buildPath = path.resolve(__dirname, 'dist');

const pages = ["index"];

module.exports = {
	mode: 'development',
	entry: pages.reduce(function (acc, key) {
		acc[key] = './src/main/assets/js/' + key + '.ts';
		return acc;
	}, {}),
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'build/dist/assets/js')
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin()
	].concat(pages.map(function (key) {
		return new HtmlWebpackPlugin({
			chunks: [key],
			filename: "./../../" + key + '.html',
			title: key,
			inject: 'head',
			hash: true,
			scriptLoading: 'defer'
		});
	})),

	resolveLoader: {
		modules: ["node_modules"]
	}
	,
	devtool: 'eval',
	resolve:
			{
				extensions: ['.js', '.json', '.hbs', '.jpg', '.png', '.less', '.css', '.ts', ".lang"],
				modules:
						[path.resolve(__dirname, "src/main"), "node_modules", path.resolve(__dirname, "build")]
			}
	,
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.html$/,
				include: path.join(__dirname, 'src/main'),
				use: {
					loader: 'html-loader',
					options: {
						interpolate: true
					}
				}
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: [/node_modules/, /test/],
				options: {appendTsSuffixTo: [/\.vue$/]}
			}
		]

	}
};