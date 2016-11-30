var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
    'superfile': ["./public/main.js"],
    'test':["./public/tests/route.spec.js"],
    'test2':["./public/tests/pathToRegex.spec.js"],
    'test3':["./public/tests/router.spec.js"]
  },
  output: {
    path: "./public/build",
    filename: "[name].js",
  },
  watch: true,
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css",  {allChunks: true})
  ]
};