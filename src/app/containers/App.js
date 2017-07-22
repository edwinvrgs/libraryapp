import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import moviesActions from '../actions/moviesActions';
import * as U from '../constants/baseUrls';

const { searchMovies, removeSearchResuts } = moviesActions;
const debouncedSearch = debounce((evt, func) => {
  func(evt.target.value);
}, 500);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.persist();
    this.setState({ searchTerm: event.target.value });
    if (event.target.value.length > 2) {
      debouncedSearch(event, this.props.searchMovies);
    } else {
      if (this.props.searchResults !== '') {
        this.props.removeSearchResuts();
      }
    }
  }

  renderTop20() {
    const { top20 } = this.props;
    if (top20.results) {
      return top20.results.map((movie, index) => {
        return (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <figure>
              <img
                src={`${U.IMG_BASE}${movie.poster_path}`}
                alt={movie.title}
              />
            </figure>
          </div>
        );
      });
    }
    return null;
  }

  renderSearchResults() {
    const { searchResults } = this.props;
    if (searchResults) {
      return searchResults.results.map((movie, index) => {
        if (movie.poster_path) {
          return (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <figure>
                <img
                  src={`${U.IMG_BASE}${movie.poster_path}`}
                  alt={movie.title}
                />
              </figure>
            </div>
          );
        }
        return null;
      });
    }
    return null;
  }
  render() {
    const { searchResults } = this.props;
    return (
      <div>
        <form>
          <input
            type='text'
            placeholder='Search'
            onChange={this.handleSearch}
            value={this.state.searchTerm}
          />
        </form>
        {searchResults ? (
          <div>
            <span>Search Results</span>
            {this.renderSearchResults()}
          </div>
        ) : null}
        {this.renderTop20()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    top20: state.movies.top20,
    searchResults: state.movies.searchResults,
  };
};

const mapDispatchToProps = {
  searchMovies,
  removeSearchResuts,
}

// TODO: Defenie Proptypes

export default connect(mapStateToProps, mapDispatchToProps)(App);
