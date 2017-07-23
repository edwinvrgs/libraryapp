const webpack = require('webpack');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/app/index.js'
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: '/node_modules/',
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.js|jsx$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          query: {
            compact: false
          }
        }
      },
      {
        test: /\.css|styl$/,
        exclude: '/node_modules/',
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              use: [require('nib')()],
              import: ['~nib/lib/nib/index.styl']
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot$/,
        loader: "file-loader"
      },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules:  ['node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}
