import React from 'react';


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

