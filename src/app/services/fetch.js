import axios from 'axios';
import * as U from '../constants/baseUrls'

const API_KEY = '877f0fd0b9365502fa0e50a7d99e8a80';

const fetch = () => {
  const fetch = axios.create({
    baseURL: U.BASE_URL,
    headers: {
      accept: 'application/json'
    },
    params: {
      'api_key': API_KEY,
      lenguage: 'en-US',
    }
  });
  return fetch;
}
export default fetch();
