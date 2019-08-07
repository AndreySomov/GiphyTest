import React from 'react';
import GifCard from './GifCard';
import GifModalWindow from './GifModalWindow';
import Loading from './Loading';
import NoMoreGifs from './NoMoreGifs';
import key from 'weak-key';
import Masonry from 'react-masonry-component';




export default class GifContainer extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      modalInfo: {},
    }

    this.slider = React.createRef();
    this.isDown = false;
  }


  extractData(data) {
    const { title, images, import_datetime, source, images: {preview_gif: { width, height }}, rating } = data;

    return {
      height,
      width,
      title,
      images,
      import_datetime,
      source,
      rating,
    }
  }

  handleClick = (event) => {
    const { searchData } = this.props;
    const gifId = +event.target.getAttribute('data-id');


    if (gifId) {
      this.setState({
        isModalOpen: true,
        modalInfo: searchData[gifId],
      });
    }
  }

  handleScroll = (event) => {
    const { fillSlider } = this.props;
    const slider = this.slider.current;
    const topOffset = slider.scrollHeight - slider.scrollTop;
    const scrHeight = document.documentElement.clientHeight;

    if (topOffset < scrHeight * 2) {
      fillSlider();
    }

    event.preventDefault();
  }

  handleClose = () => {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { searchData, isGettingData, isContentOver } = this.props;
    const { isModalOpen, modalInfo } = this.state;

    const masonryOptions = {
      transitionDuration: 0
    };

    const imagesLoadedOptions = { background: '.my-bg-image-el' }

    return (
      <div
        className="slider"
        onClick={this.handleClick}
        onScroll={this.handleScroll}
        ref={this.slider}
      >
        <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'ul'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            imagesLoadedOptions={imagesLoadedOptions} // default {}
        >
            {searchData.map((data, i) =>  
              <li>
                <GifCard 
                  key={key(data)} 
                  data={this.extractData(data)} 
                  id={i} 
                />
              </li> )
            }
        </Masonry>
    

        {isGettingData && <Loading />}

        {isContentOver && <NoMoreGifs />}

        {isModalOpen && 
          <GifModalWindow
            open={ isModalOpen }
            onClose={ this.handleClose }
            modalInfo={ this.extractData(modalInfo) }
          />
        }

        
      </div>

    )
  }
}

