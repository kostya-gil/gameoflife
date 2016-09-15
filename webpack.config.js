module.exports = {
  entry: './app/scripts/app.js',
	
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'babel',
    }],
  },
  output: {
    path: './dist/assets/scripts/',
    filename: 'app.js',
    pathinfo: false
  },
  resolve: {
    extensions: [
      '',
      '.js',
    ],
  },
};
