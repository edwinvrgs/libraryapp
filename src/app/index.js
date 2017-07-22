import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import App from './containers/App';
import '../client/styles/main.styl';

if (typeof window !== 'undefined') {
  const preloadedState = window.__PRELOADED_STATE__
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  delete window.__PRELOADED_STATE__

  const store = createStore(rootReducer, preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunk,
      ),
    ),
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}
