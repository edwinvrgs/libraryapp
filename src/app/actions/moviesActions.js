import endpoints from '../constants/endpoints';
import * as A from '../constants';

export function getMostPopular() {
  return dispatch => {
    endpoints.getPopular()
      .then((res) => dispatch({ type: A.GET_TOP_20, payload: res }))
      .catch((err) => console.log('getMostPopular error: ', err));
  };
}

export function searchMovies(params) {
  return dispatch => {
    endpoints.searchMovies(params)
      .then((res) => dispatch({ type: A.GET_SEARCH_RESULTS, payload: res }))
      .catch((err) => console.log('searchMovies error: ', err));
  };
}

export function removeSearchResuts() {
  return {
    type: A.EMPTY_SEARCH_RESULTS
  }
}

export function fetchPopular() {
  return endpoints.getPopular()
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log('Error in fetchPopular: ', error);
    });
}

export default {
  fetchPopular,
  searchMovies,
  getMostPopular,
  removeSearchResuts,
};
