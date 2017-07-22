import webpack from 'webpack';
import express from 'express';
import path from 'path';
import http from 'http';
//SSR Imports
import bodyParser from 'body-parser';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../app/reducers/rootReducer';
import App from '../app/containers/App';
import { renderToString } from 'react-dom/server'
import moviesActions from '../app/actions/moviesActions';

const app = express()
const port = 3000
const { fetchPopular } = moviesActions;

console.log('Loading development server configs')
const webpackConfig = require('../../webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = webpack(webpackConfig)
const serverConfig = {
  contentBase: 'http://localhost:' + port,
  port: port,
  quiet: false,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  inline: true,
  lazy: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  historyApiFallback: true,
  stats: { colors: true }
}
app.use(webpackDevMiddleware(compiler, serverConfig))
app.use(webpackHotMiddleware(compiler))
app.use(express.static('build'))

// app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/../client/index.html')))

//SSR Start :)
app.use(handleRender);

function handleRender(req, res) {
  fetchPopular()
    .then((resp) => {
      const store = createStore(rootReducer, {
        name: 'The TV Library',
        movies: {
          top20: resp,
        },
      }, compose(applyMiddleware(thunk)));

      const html = renderToString(
        <Provider store={store}>
          <App/>
        </Provider>
      );

      const preloadedState = store.getState();
      res.send(renderFullPage(html, preloadedState));
    });
}
function renderFullPage(html, preloadedState) {
    return `
      <!doctype html>
        <html>
          <head>
            <title>Media Library App</title>
          </head>
          <body>
             <div id="root">${html}</div>
              <script>
               window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
          <script src="bundle.js"></script>
          </body>
      </html>
    `
}
// END OF SSR

app.listen(port, err => {
  if (err) throw err
  console.log(`Library frontend listening on port ${port} 🌎`)
})
