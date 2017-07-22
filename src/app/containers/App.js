import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moviesActions from '../actions/moviesActions';

const { getMostPopular } = moviesActions;

class App extends PureComponent {

  renderTop20() {
    const { top20 } = this.props;
    if (top20.results) {
      return top20.results.map((movie, index) => {
        return (
          <div key={movie.id}>
            {movie.title}
          </div>
        );
      });
    }
    return null;
  }

  render() {
    const { top20 } = this.props;
    return (
      <div>
        {top20 ? this.renderTop20() :
          (
            <div>
              Loading...
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    top20: state.movies.top20,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMostPopular: () => dispatch(getMostPopular())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
