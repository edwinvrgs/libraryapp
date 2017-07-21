import React, { PureComponent } from 'react';
import endpoints from '../constants/endpoints';
import axios from 'axios';
import parser from 'xmltojson';

const instance = axios.create({
  baseURL: 'https://www.goodreads.com',
  headers: {
    accept: 'application/xml',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

class App extends PureComponent {
  componentWillMount() {
    instance.get(endpoints.search, {
      params: {
        q: 'Harry Potter',
        search: 'title',
      }
    })
    .then((response) => {
      console.log(parser.parseString(response));
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        Hola mundo
      </div>
    );
  }
}
export default App;
