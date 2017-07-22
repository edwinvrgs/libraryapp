import axios from 'axios';
// import p from 'xml-js';

const API_KEY = '877f0fd0b9365502fa0e50a7d99e8a80';
const BASE_URL = 'https://api.themoviedb.org/3/';

const fetch = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json'
  }
});

const endpoints = {
  searchMovies: `${BASE_URL}search/movie`,
  searchPopular: `${BASE_URL}discover/movie`
};

function searchMovies(query) {
  return fetch.get(endpoints.searchMovies, {
    params: {
      'api_key': API_KEY,
      lenguage: 'en-US',
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
      'api_key': API_KEY,
      lenguage: 'en-US',
      'sort_by': 'popularity.desc'
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
