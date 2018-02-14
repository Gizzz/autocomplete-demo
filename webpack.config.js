module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
    publicPath: '/',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      // enable this if have some trouble with debugging
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
  devtool: "source-map",
  devServer: {
    contentBase: __dirname + "/dist",
    port: 3000,
    https: false,
    compress: true,
    historyApiFallback: true,
    hot: false,
  },
};
