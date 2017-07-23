import React from 'react';
import Proptypes from 'prop-types';

const SearchBar = ({ keyPress, search, value, searching, close, hasResults }) => {
  return (
    <form
      onKeyPress={keyPress}
      className='search-from'
    >
      <input
        type='text'
        placeholder='Search any Movie...'
        onChange={search}
        value={value}
        className='search-input'
      />
      {searching ?
        hasResults.results ?
          (
            <span
              onClick={close}
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
  );
};

SearchBar.propTypes = {
  keyPress: Proptypes.func.isRequired,
  search: Proptypes.func.isRequired,
  value: Proptypes.string.isRequired,
  searching: Proptypes.bool.isRequired,
  close: Proptypes.func.isRequired,
  hasResults: Proptypes.object,
};

SearchBar.defaultProps = {
  hasResults: {},
}

export default SearchBar;
