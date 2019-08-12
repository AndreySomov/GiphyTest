import React from 'react';
import GifCard from '../GifCard/GifCard';
import GifModalWindow from '../GifModalWindow/GifModalWindow';
import NoMoreGifs from '../NoMoreGifs/NoMoreGifs';
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
      modalInfo: null,
      isContentOver: false,
    }

    this.giphyOffset = 0;
    this.gifLimit = 40;
  }

  componentDidMount() {
    const {searchRequest} = this.props;

    if(searchRequest){
      this.getData(searchRequest)
          .then(data => this.setState({ searchData: data.data }));
    }
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
      this.setState({ modalInfo: searchData[ gifId ] });
    }
  }

  handleScroll = async (event) => {
    const { searchRequest, isGettingData } = this.props;
    const { searchData } = this.state;
    const slider = event.target;
    const topOffset = slider.scrollHeight - slider.scrollTop;
    const scrHeight = document.documentElement.clientHeight;

    if (topOffset < scrHeight * 2 && !isGettingData) {
      const newData = await this.getData(searchRequest);
      if(!newData) return;
      this.setState({ searchData: searchData.concat(newData.data) });
    }
  }

  handleModalClose = () => {
    this.setState({ modalInfo: null });
  }

  getData = async (request) => {
    const { isContentOver } = this.state;
    const { isGettingData, toggleGettingData, maxCountValue, chunkSize } = this.props;

    if(isGettingData || isContentOver ) return;

    const url = `${ constants.giphyDomain }.${request}&api_key=${ constants.APIKey }&limit=${ chunkSize }&offset=${ this.giphyOffset }`;

    toggleGettingData();
  
    const data = await giphyRequest(url);

    toggleGettingData();

    this.giphyOffset += +chunkSize;
    this.gifLimit = Math.min(data.pagination.total_count, maxCountValue);

    if(this.giphyOffset >= this.gifLimit ) this.setState({ isContentOver: true });

    return data;
  }

  render() {
    const { isModalOpen, modalInfo, searchData, isContentOver } = this.state;

    return (
      <div
        className="gif-container"
        onClick={ this.handleClick }
        onScroll={ this.handleScroll }
      >
        <Masonry
          className={'my-gallery-class'}
          elementType={'ul'}
          options={{ transitionDuration: 0 }}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
          imagesLoadedOptions={ { background: '.my-bg-image-el' } }
        >   
          {searchData.map((data, i) =>  
              <li key={key(data)} >
                <GifCard data={this.extractData(data)} id={i} />
              </li> )
          }
        </Masonry>
    
        { isContentOver && <NoMoreGifs />}

        { !!modalInfo &&
          <GifModalWindow
            open={ !!modalInfo }
            onClose={ this.handleModalClose }
            modalInfo={ this.extractData(modalInfo) }
          />
        }
      </div>
    )
  }
}

