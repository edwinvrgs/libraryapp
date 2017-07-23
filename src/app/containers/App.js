import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import moviesActions from '../actions/moviesActions';
import Movie from '../components/Movie';

const { getMostPopular, searchMovies, removeSearchResuts } = moviesActions;
const debouncedSearch = debounce((evt, func) => {
  func(evt.target.value);
}, 500);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      isSearching: false,
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCloseSearch = this.handleCloseSearch.bind(this);
  }

  componentWillMount() {
    this.props.getMostPopular();
  }

  handleCloseSearch(event) {
    event.preventDefault();
    this.setState({
      isSearching: false,
      searchTerm: '',
    });
    this.props.removeSearchResuts();
  }

  handleSearch(event) {
    event.persist();
    this.setState({ searchTerm: event.target.value });
    if (!this.state.isSearching) {
      this.setState({ isSearching: true });
    }
    if (event.target.value.length > 2) {
      debouncedSearch(event, this.props.searchMovies);
    } else {
      if (this.props.searchResults !== {}) {
        this.setState({ isSearching: false });
        this.props.removeSearchResuts();
      }
    }
  }

  renderTop20() {
    const { top20 } = this.props;
    if (top20.results) {
      return top20.results.map((movie, index) => {
        return <Movie key={movie.id} movie={movie} />
      });
    }
    return null;
  }

  renderSearchResults() {
    const { searchResults } = this.props;
    if (searchResults.total_results > 0) {
      return searchResults.results.map((movie, index) => {
        if (movie.poster_path) {
          return <Movie key={movie.id} movie={movie} />
        }
        return null;
      });
    }
    return (
      <div>
        No results found
      </div>
    )
  }

  handleEnterButton(event) {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  render() {
    const { searchResults, top20 } = this.props;
    const { isSearching } = this.state;
    return (
      <div className='main-contianer'>
        <form
          onKeyPress={this.handleEnterButton}
          className='search-from'
        >
          <input
            type='text'
            placeholder='Search'
            onChange={this.handleSearch}
            value={this.state.searchTerm}
            className='search-input'
          />
          {isSearching ?
            searchResults.results ?
              (
                <span
                  onClick={this.handleCloseSearch}
                  className='close-search-icon'
                >
                  x
                </span>
              ) : (
                <span className='icon-spinner9 search-spinner-icon' />
              ) : (
              <span className='icon-search search-bar-icon' />
            )
          }
        </form>
        {searchResults && searchResults.results ? (
          <div className='vertical-wrapper'>
            <h2 className='vertical-wrapper-title'>
              Search Results:
            </h2>
            <section className='search-results-container'>
              {this.renderSearchResults()}
            </section>
          </div>
        ) : null}
        {top20 ?
          (
            <div className='vertical-wrapper'>
              <h2 className='vertical-wrapper-title'>
                Most popular movies
              </h2>
              <section className='top-movies-container'>
                {this.renderTop20()}
              </section>
            </div>
          ) : null
        }
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
  getMostPopular,
}

App.propTypes = {
  top20: Proptypes.object,
  searchResults: Proptypes.object,
  searchMovies: Proptypes.func.isRequired,
  removeSearchResuts: Proptypes.func.isRequired,
  getMostPopular: Proptypes.func.isRequired,
};

App.defaultProps = {
  top20: {},
  searchResults: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
