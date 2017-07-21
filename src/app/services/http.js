import axios from 'axios'
import 'babel-polyfill'

const Http = () => {
  const fetch = () => {
    return axios.create({
      baseUrl: 'https://www.goodreads.com',
      'Content-Type': 'application/json',
    });
  }
  return {
    http,
  }
}
export default Http()
