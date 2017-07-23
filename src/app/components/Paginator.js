import React from 'react';
import Proptypes from 'prop-types';

const Paginator = ({ currentPage, onChange }) => {
  return (
    <div className='paginator-container'>
      {currentPage > 1 ?
        (
          <a
            className='paginator-element'
            onClick={evt => onChange(evt, currentPage - 1)}
          >
            <span className='icon-circle-left' />
            <span>{`${currentPage - 1}`}</span>
          </a>
        ) : null
      }
      <span
        className='paginator-element current'
      >
        {currentPage}
      </span>
      <a
        className='paginator-element'
        onClick={evt => onChange(evt, currentPage + 1)}
      >
        <span>{`${currentPage + 1}`}</span>
        <span className='icon-circle-right' />
      </a>
    </div>
  );
};

Paginator.propTypes = {
  currentPage: Proptypes.number,
  onChange: Proptypes.func.isRequired,
};

Paginator.defaultProps = {
  currentPage: 1,
}

export default Paginator;
