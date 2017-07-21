const webpack = require('webpack')
const express = require('express')
const path = require('path')
const http = require('http')

const app = express()
const port = 3000

console.log('Loading development server configs')
const webpackConfig = require('../../webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = webpack(webpackConfig)
const serverConfig = {
  contentBase: 'http://localhost:' + port,
  port: port,
  host: 'https://www.goodreads.com',
  origin: 'https://www.goodreads.com',
  referer: 'https://www.goodreads.com',
  quiet: false,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  inline: true,
  lazy: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    origin: 'https://www.goodreads.com',
    referer: 'https://www.goodreads.com',
  },
  historyApiFallback: true,
  stats: { colors: true }
}
app.use(webpackDevMiddleware(compiler, serverConfig))
app.use(webpackHotMiddleware(compiler))
app.use(express.static('build'))
app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/../client/index.html')))

app.listen(port, err => {
  if (err) throw err
  console.log(`Library frontend listening on port ${port} 🌎`)
})
