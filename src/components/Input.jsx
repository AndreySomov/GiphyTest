import React from 'react';
import PropTypes from 'prop-types';

export default function GifCard({ handleChange }) {
  return (
    <input
      type="search"
      name="search"
      className="search-input"
      placeholder="Giphy search"
      onChange={ handleChange }
    />
  );
}


GifCard.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
