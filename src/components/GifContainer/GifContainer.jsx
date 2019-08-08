import React from 'react';
import GifCard from '../GifCard/GifCard';
import GifModalWindow from '../GifModalWindow/GifModalWindow';
import NoMoreGifs from '../NoMoreGifs/NoMoreGifs';
import key from 'weak-key';
import Masonry from 'react-masonry-component';
import './gifContainer.scss';




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
    const { searchData, isContentOver } = this.props;
    const { isModalOpen, modalInfo } = this.state;

    const masonryOptions = {
      transitionDuration: 0
    };

    const imagesLoadedOptions = { background: '.my-bg-image-el' }

    return (
      <div
        className="gif-container"
        onClick={ this.handleClick }
        onScroll={ this.handleScroll }
        ref={ this.slider }
      >
        <Masonry
            className={'my-gallery-class'}
            elementType={'ul'}
            options={masonryOptions}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
            imagesLoadedOptions={imagesLoadedOptions}
        >   
            {!!searchData.length && 
              searchData.map((data, i) =>  
                <li key={key(data)} >
                  <GifCard 
                    data={this.extractData(data)} 
                    id={i} 
                  />
                </li> )
            }
        </Masonry>
    
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

