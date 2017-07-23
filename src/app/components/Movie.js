import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import * as U from '../constants/baseUrls';

class Movie extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailsClicked: false,
    };
    this.handleDetailsOpen = this.handleDetailsOpen.bind(this);
    this.handleDetailsClose = this.handleDetailsClose.bind(this);
  }
  splitDate(date) {
    return date.split('-');
  }

  handleDetailsOpen(event, id) {
    this.setState({ detailsClicked: !this.state.detailsClicked });
    this.props.getMovie(id);
  }

  handleDetailsClose(event) {
    event.preventDefault();
    this.setState({ detailsClicked: false });
  }

  render() {
    const { movie, movieDetails } = this.props;
    const { detailsClicked } = this.state;
    return (
      <article
        className='movie-element'
        onClick={(evt) => this.handleDetailsOpen(evt, movie.id)}
      >
        <figure className='movie-figure'>
          <img
            src={`${U.IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
          />
        </figure>
        <div className='movie-details-container'>
          <span className='movie-details-title'>
            {movie.title}
          </span>
          <span className='movie-details-date'>
            Year: {this.splitDate(movie.release_date)[0]}
          </span>
        </div>
        {detailsClicked ?
          movie.title === movieDetails.title ?
          (
            (
              <div
                className='movie-more-details-wrapper'
                onMouseLeave={this.handleDetailsClose}
              >
                <div className='movie-more-details'>
                  <div className='movie-more-details-left'>
                    <figure className='movie-figure'>
                      <img
                        src={`${U.IMG_BASE}${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                      />
                    </figure>
                  </div>
                  <div className='movie-more-details-right'>
                    <h3 className='movie-more-details-title'>
                      {movieDetails.original_title}
                    </h3>
                    <span className='movie-more-details-release'>
                      Release date: {movieDetails.release_date}
                    </span>
                    <p className='movie-more-details-overview'>
                      {movieDetails.overview}
                    </p>
                    <a
                      href={movieDetails.homepage}
                      target='_blank'
                      className='movie-more-details-web'
                    >
                      Website
                    </a>
                    <span className='movie-more-details-average'>
                      Vote Average: {movieDetails.vote_average}
                    </span>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className='movie-more-details-wrapper'>
              <div className='movie-more-details-loader'>
                <span className='icon-spinner9' />
              </div>
            </div>
          ) : null
        }
      </article>
    );
  }
}

Movie.propTypes = {
  movie: Proptypes.object.isRequired,
  getMovie: Proptypes.func.isRequired,
  movieDetails: Proptypes.object,
};

Movie.defaultProps = {
  movieDetails: {},
}

export default Movie;
