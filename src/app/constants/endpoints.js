import fetch from '../services/fetch';

const endpoints = {
  searchMovies: '/search/multi',
  searchPopular: '/discover/movie',
  getMovie: '/movie/',
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
    console.log('Error in searchMovies', error);
  });
}

function getPopular(page) {
  return fetch.get(endpoints.searchPopular, {
    params: {
      'sort_by': 'popularity.desc',
      page,
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log('Error in getPopular', error);
  });
}

function getPopularByYear(year) {
  return fetch.get(endpoints.searchPopular, {
    params: {
      'sort_by': 'vote_average.desc',
      'primary_release_year': year,
    },
  })
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log('Error in getPopular', error);
  });
}

function getMovie(id) {
  return fetch.get(endpoints.getMovie + id)
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    console.log('Error in getMovie', error);
  });
}

export default {
  searchMovies,
  getPopular,
  getMovie,
  getPopularByYear
};
