import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import moviesActions from '../actions/moviesActions';
import Movie from '../components/Movie';
import SearchBar from '../components/SearchBar';
import Paginator from '../components/Paginator';

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
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCloseSearch = this.handleCloseSearch.bind(this);
  }

  componentWillMount() {
    this.props.getMostPopular(1);
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

  handlePageChange(event, page) {
    event.preventDefault()
    this.props.getMostPopular(page);
  }

  renderMostPopular() {
    const { mostPopular } = this.props;
    if (mostPopular.results) {
      return mostPopular.results.map((movie, index) => {
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
    return <div>No results found</div>
  }

  handleEnterButton(event) {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  render() {
    const { searchResults, mostPopular } = this.props;
    const { isSearching, searchTerm } = this.state;
    return (
      <div className='main-contianer'>
        <SearchBar
          keyPress={this.handleEnterButton}
          search={this.handleSearch}
          value={searchTerm}
          searching={isSearching}
          close={this.handleCloseSearch}
          hasResults={searchResults}
        />
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
        {mostPopular ?
          (
            <div className='vertical-wrapper'>
              <h2 className='vertical-wrapper-title'>
                Most popular movies
              </h2>
              <section className='top-movies-container'>
                {this.renderMostPopular()}
                <Paginator currentPage={mostPopular.page} onChange={this.handlePageChange}/>
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
    mostPopular: state.movies.mostPopular,
    searchResults: state.movies.searchResults,
  };
};

const mapDispatchToProps = {
  searchMovies,
  removeSearchResuts,
  getMostPopular,
}

App.propTypes = {
  mostPopular: Proptypes.object,
  searchResults: Proptypes.object,
  searchMovies: Proptypes.func.isRequired,
  removeSearchResuts: Proptypes.func.isRequired,
  getMostPopular: Proptypes.func.isRequired,
};

App.defaultProps = {
  mostPopular: {},
  searchResults: {},
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
