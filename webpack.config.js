module.exports = {
  entry: './src/client/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      // enable this if have some trouble with debugging typescript
      // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname + '/dist',
    port: 3000,
    https: false,
    compress: true,
    historyApiFallback: true,
    hot: false,
    proxy: {
      '/proxy': 'http://localhost:9000',
    },
  },
};
