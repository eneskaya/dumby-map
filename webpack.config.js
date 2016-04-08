module.exports = {
  entry: './src/app.js',
  output: {
    filename: './www/bundle.js',
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        loader: 'babel',
      },
    ],
  },
};
