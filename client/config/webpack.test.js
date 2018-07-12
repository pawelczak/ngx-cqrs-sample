const helpers = require('./helpers'),
	path = require('path'),
	rootDir = path.resolve(__dirname, '..'),
	webpack = require('webpack');

module.exports = {

	mode: 'development',

	devtool: 'inline-source-map',

	resolve: {
		extensions: ['.ts', '.js'],

		modules: [
			path.join(rootDir, 'node_modules'),
			// path.join(rootDir, 'src'),
			path.join(rootDir, 'test'),
		],
		alias: {
			'src': path.resolve(rootDir, 'src'),
			'ngx-cqrs': path.resolve(rootDir, 'src/util/ngx-cqrs')
		}

	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loaders: [
					'to-string-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				loaders: [
					'to-string-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.html$/,
				loader: 'raw-loader'
			}
		]

	},

	plugins: [
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)/,
			helpers.root('./src'),
			{}
		)
	]

};
