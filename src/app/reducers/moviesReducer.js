import * as A from '../constants';
import initialState from '../initialState';
import R from 'ramda';

export default function moviesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case A.GET_MOST_POPULAR:
      return R.merge(state, {
        mostPopular: payload,
      });
    case A.GET_SEARCH_RESULTS:
      return R.merge(state, {
        searchResults: payload,
      });
    case A.EMPTY_SEARCH_RESULTS:
      return R.merge(state, {
        searchResults: {},
      });
    default:
      return state;
  }
}
