import endpoints from '../constants/endpoints';
import * as A from '../constants';

export function getMostPopular(page) {
  return dispatch => {
    endpoints.getPopular(page)
      .then((res) => dispatch({ type: A.GET_MOST_POPULAR, payload: res }))
      .catch((err) => console.log('getMostPopular error: ', err));
  };
}

export function fetchScrolled(page) {
  return dispatch => {
    endpoints.getPopular(page)
      .then((res) => dispatch({ type: A.FETCH_MOST_POPULAR, payload: res }))
      .catch((err) => console.log('getMostPopular error: ', err));
  };
}

export function getPopularByYear(year) {
  return dispatch => {
    endpoints.getPopularByYear(year)
      .then((res) => dispatch({ type: A.GET_MOST_POPULAR, payload: res }))
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

export function getMovie(id) {
  return dispatch => {
    endpoints.getMovie(id)
      .then((res) => dispatch({ type: A.GET_MOVIE, payload: res }))
      .catch((err) => console.log('getMovie error: ', err));
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
  getMovie,
  fetchScrolled,
};
