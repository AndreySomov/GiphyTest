import React from 'react';
import PropTypes from 'prop-types';


export default function GifModalWindow({ data }) {
  return (
    <div className="gif-modal-window">
      <span>{data.title}</span>
      <span>
        Import date:
        {' '}
        {data.import_datetime}
      </span>
      <span>
        Content rating:
        {' '}
        {data.rating}
      </span>
      <a
        href={data.source}
        rel="noopener noreferrer"
        target="_blank"
        className="source-link"
      >
        <span>Source link</span>
      </a>
    </div>
  );
}

GifModalWindow.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};
