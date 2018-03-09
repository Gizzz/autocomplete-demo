const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/generated',
    publicPath: 'generated/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false }
          },
          'sass-loader'
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/generated']),
  ],
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
