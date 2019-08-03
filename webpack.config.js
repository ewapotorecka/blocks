/* eslint-env node */

const path = require( 'path' );

module.exports = {
	entry: './src/index.ts',
	output: {
		path: path.resolve( 'dist' ),
		filename: 'main.js',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [ '.ts', '.tsx', '.js' ]
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader'
			}
		]
	},

	// Other options...
};
