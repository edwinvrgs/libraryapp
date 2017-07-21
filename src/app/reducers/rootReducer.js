import { combineReducers } from 'redux';

import setName from './setName';

const rootReducer = combineReducers(
  {
    name: setName,
  });

export default rootReducer;
