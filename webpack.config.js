const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: './img/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('./style/style.css'),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
