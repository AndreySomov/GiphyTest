import React from 'react';
import constants from '../../constants';
import './gifCard.scss';


export default function GifCard({ data, id }) {

  const culcHeight = (width, height) => {
    const dif = constants.gifWidth / width;
  
    return height * dif;
  }

  return (
    <img
      src={ data.images.preview_gif.url }
      alt='some gif'
      className="card-gif"
      data-id={ id }
      height={ culcHeight(data.width, data.height) }
      width={ constants.gifWidth }
    />
  );
}
