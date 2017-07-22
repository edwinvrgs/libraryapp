import endpoints from '../constants/endpoints';
import * as A from '../constants';

export function getMostPopular() {
  return dispatch => {
    endpoints.getPopular()
      .then(res => dispatch({ type: A.GET_TOP_20, payload: res }));
  };
}

export function fetchPopular() {
  return endpoints.getPopular()
}

export default {
  getMostPopular,
  fetchPopular,
};
