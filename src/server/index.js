import webpack from 'webpack';
import express from 'express';
import path from 'path';
import http from 'http';
import dotenv from 'dotenv';
//SSR Imports
import bodyParser from 'body-parser';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../app/reducers/rootReducer';
import initialState from '../app/initialState';
import App from '../app/containers/App';
import { renderToString } from 'react-dom/server';
import R from 'ramda';


const Env = (envVars) => {
  const ENV_NAMES = {
    development: 'development',
    staging: 'staging',
    production: 'production',
  }
  const current = envVars.NODE_ENV || ENV_NAMES.development
  const envIs = (name) => {
    return (checkName = current) => {
      return name === checkName
    }
  }
  const isProduction = envIs(ENV_NAMES.production)
  const isStaging = envIs(ENV_NAMES.staging)
  const isDevelopment = envIs(ENV_NAMES.development)
  return R.merge(envVars, {
    current,
    isProduction,
    isStaging,
    isDevelopment
  })
}

dotenv.config() // pull .env into process.env if it exists
const ENV = Env(process.env)
const app = express()
const port = process.env.PORT || 3000

if (ENV.isDevelopment()) {
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
  app.use(handleRender);
} else {
  app.use(express.static('public'))
  app.use(handleRender);
}

function handleRender(req, res) {
  const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));
  const html = renderToString(
    <Provider store={store}>
      <App/>
    </Provider>
  );

  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
}
function renderFullPage(html, preloadedState) {
    return `
      <!doctype html>
        <html>
          <head>
            <title>Media Library App</title>
            <meta name="description" content="Search movies info from this awesome app">
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1, shrink-to-fit=no"
            >
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
