import React from 'react';
import Proptypes from 'prop-types';
import * as U from '../constants/baseUrls';

const splitDate = (date) => {
  return date.split('-');
}

const Movie = ({ movie }) => (
  <article className='movie-element'>
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
        Year: {splitDate(movie.release_date)[0]}
      </span>
    </div>
  </article>
);

Movie.propTypes = {
  movie: Proptypes.object.isRequired,
};

export default Movie;
