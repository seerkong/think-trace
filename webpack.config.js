const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = path.join(__dirname, 'src/template');
module.exports = {
  entry: {
    '404': path.join(base, 'src/404'),
    '500': path.join(base, 'src/500')
  },
  output: {
    path: base,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'zepto': path.join(__dirname, 'node_modules/webpack-zepto/index.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['es2015', {loose: true, module: false}]
          ]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'zepto'
    }),
    new HtmlWebpackPlugin({
      template: path.join(base, 'src/404/index.html'),
      filename: path.join(base, '404.html'),
      chunks: ['404'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      template: path.join(base, 'src/500/index.html'),
      filename: path.join(base, '500.html'),
      chunks: ['500'],
      inject: false,
      minify: {html5: false}
    })
  ]
};