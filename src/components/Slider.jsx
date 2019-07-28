import React from 'react';
import GifCard from './GifCard';
import key from 'weak-key';



export default class GifContainer extends React.PureComponent {

  constructor(props) {
    super(props);

    this.slider = React.createRef();
    this.isDown = false;
  }


  extractData(data) {
    const { title, images: { downsized: { url } }, import_datetime, source, rating } = data;

    return {
      title,
      url,
      import_datetime,
      source,
      rating,
    }
  }

  checkSlider = () => {
    const { fillSlider } = this.props;
    const slider = this.slider.current;
    const rightOffset = slider.scrollWidth - slider.scrollLeft;
    const scrWidth = document.documentElement.clientWidth;

    if (rightOffset < scrWidth * 2) fillSlider();
  }

  handleMauseDown = (event) => {
    event.preventDefault();
    this.scrollLeft = this.slider.current.scrollLeft;
    this.startX = event.pageX;
    this.isDown = true;
  }

  handleMauseMove = (event) => {
    const slider = this.slider.current;
    const step = this.startX - event.pageX;

    if (!this.isDown) return;
    slider.scrollLeft = this.scrollLeft + step;
    event.preventDefault();
  }

  handleMauseUp = (event) => {
    event.preventDefault();
    this.isDown = false;
    this.checkSlider();
  }

  render() {
    const { searchData } = this.props;

    return (
      <div
        className="slider"
        onMouseDown={ this.handleMauseDown }
        onMouseMove={ this.handleMauseMove }
        onMouseLeave={ this.handleMauseUp }
        onMouseUp={ this.handleMauseUp }
        ref={ this.slider }
      >
        {searchData.map(data => <GifCard key={key(data)} data={this.extractData(data)} />)}
      </div>
    );
  }
}

