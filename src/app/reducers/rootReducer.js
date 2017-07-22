import { combineReducers } from 'redux';

import setName from './setName';
import moviesReducer from './moviesReducer';

const rootReducer = combineReducers(
  {
    name: setName,
    movies: moviesReducer,
  });

export default rootReducer;
