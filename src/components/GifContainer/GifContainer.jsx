import React from 'react';
import GifCard from '../GifCard/GifCard';
import GifModalWindow from '../GifModalWindow/GifModalWindow';
import NoMoreGifs from '../NoMoreGifs/NoMoreGifs';
import Loading from '../Loading/Loading';
import giphyRequest from '../../http/giphyRequest';
import constants from '../../constants';
import key from 'weak-key';
import Masonry from 'react-masonry-component';
import './gifContainer.scss';




export default class GifContainer extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      searchData: [],
      isGettingData: false,
      isModalOpen: false,
      modalInfo: {},
    }

    this.giphyOffset = 0;
    this.total_count = 0;
    this.slider = React.createRef();
    this.isDown = false;
  }

  async componentDidMount() {
    const { searchRequest } = this.props;
    const newData = await this.getData(searchRequest);

    this.setState({
      searchData: newData.data,
    });
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
    const { searchData } = this.state;
    const gifId = +event.target.getAttribute('data-id');


    if (gifId) {
      this.setState({
        isModalOpen: true,
        modalInfo: searchData[gifId],
      });
    }
  }

  handleScroll = async (event) => {
    const { searchRequest, isGettingData } = this.props;
    const { searchData } = this.state;
    const slider = this.slider.current;
    const topOffset = slider.scrollHeight - slider.scrollTop;
    const scrHeight = document.documentElement.clientHeight;

    if (topOffset < scrHeight * 2 && !isGettingData) {
      const newData = await this.getData(searchRequest);

      this.setState({ searchData: searchData.concat(newData.data) });
    }
  }

  handleClose = () => {
    this.setState({ isModalOpen: false });
  }

  toggleGettingData = () => {
    const { isGettingData } = this.state;
    this.setState({ isGettingData: !isGettingData });
  }

  getData = async (request) => {
    const { countValue, maxCountValue } = this.state;
    const { isGettingData } = this.props;
    if(isGettingData) return;
    const url = `${constants.giphyDomain}.${request}&api_key=${constants.APIKey}&limit=${50}&offset=${this.giphyOffset}`;

    this.toggleGettingData();
  
    const data = await giphyRequest(url);

    this.toggleGettingData();

    this.giphyOffset += countValue;
    this.total_count = Math.min(data.pagination.total_count, maxCountValue);

    return data;
  }

  render() {
    const { isContentOver } = this.props;
    const { isModalOpen, modalInfo, searchData, isGettingData } = this.state;

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
          {searchData.map((data, i) =>  
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

        <Loading />
      </div>
    )
  }
}

