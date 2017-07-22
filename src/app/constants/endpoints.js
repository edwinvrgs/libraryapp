import fetch from '../services/fetch';

const endpoints = {
  searchMovies: '/search/movie',
  searchPopular: '/discover/movie'
};

function searchMovies(query) {
  return fetch.get(endpoints.searchMovies, {
    params: {
      query,
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log(error);
  });
}

function getPopular() {
  return fetch.get(endpoints.searchPopular, {
    params: {
      'sort_by': 'popularity.desc',
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log(error);
  });
}

export default {
  searchMovies,
  getPopular,
};
