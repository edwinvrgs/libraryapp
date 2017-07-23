import * as A from '../constants';
import initialState from '../initialState';
import R from 'ramda';

export default function moviesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case A.GET_MOST_POPULAR:
      return R.merge(state, {
        mostPopular: payload,
      });
    case A.FETCH_MOST_POPULAR:
      return {
        ...state,
        mostPopular: {
          page: payload.page,
          'total_results': payload.total_results,
          'total_pages': payload.total_pages,
          results: R.concat(state.mostPopular.results || [], payload.results)
        }
      }
    case A.GET_SEARCH_RESULTS:
      return R.merge(state, {
        searchResults: payload,
      });
    case A.EMPTY_SEARCH_RESULTS:
      return R.merge(state, {
        searchResults: {},
      });
    case A.GET_MOVIE:
      return R.merge(state, {
        movieInfo: payload,
      });
    default:
      return state;
  }
}
