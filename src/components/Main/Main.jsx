import React from 'react';
import SearchInput from '../SearchInput';
import FiltersMenu from '../FiltersMenu';
import GifContainer from '../GifContainer';
import constants from '../../constants';
import giphyRequest from '../../http/giphyRequest';
import './main.scss'; 


export default class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchData: [],
      modalWindowData: {},
      isGettingData: false,
      isContentOver: false,
      isConnectionErr: false,
      countValue: 40,
      maxCountValue: 1000,
    }

    this.giphyOffset = 0;
    this.total_count = 0;
    
  }


  handleSearchChange = async (event) => {
    const searchRequest = event.target.value;

    if(!searchRequest){
      clearInterval(this.timer);

      this.setState({ 
        searchData: {},
        isContentOver: false,
      });

      this.searchRequest = searchRequest;
      this.giphyOffset = 0;

    } else {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
    
        if(searchRequest === this.searchRequest) return;

        const data = await this.getData(searchRequest);

        this.setState({ 
          searchData: data.data,
          isContentOver: false,
        });

        this.searchRequest = searchRequest;
        this.giphyOffset = 0;

      }, 500); 
    }
  }

  handleCountChange = (event) => {
    const value = event.target.value;
    const count = +value.replace(/[^0-9]/, '');

    this.setState({countValue: Math.max(1, count)});
  }

  handleMaxCountChange = (event) => {
    const value = event.target.value;
    const count = +value.replace(/[^0-9]/, '');

    this.setState({maxCountValue: Math.max(1, count)});
  }

  fillSlider = async () => {
    const { isGettingData, searchData, isContentOver } = this.state;

    if(isContentOver || isGettingData) return;

    const newData = await this.getData(this.searchRequest);
    const newSearchData = searchData.concat(newData.data);

    if(this.giphyOffset >= this.total_count) this.setState({isContentOver: true});

    this.setState({ searchData: newSearchData });
  
  }

  toggleGettingData = () => {
    const { isGettingData } = this.state;
    this.setState({ isGettingData: !isGettingData });
  }

  getData = async (request) => {
    const { countValue, maxCountValue } = this.state;
    const url = `${constants.giphyDomain}.${request}&api_key=${constants.APIKey}&limit=${countValue}&offset=${this.giphyOffset}`;

    this.toggleGettingData();
  
    const data = await giphyRequest(url);

    this.toggleGettingData();

    this.giphyOffset += countValue;
    this.total_count = Math.min(data.pagination.total_count, maxCountValue);

    return data;
  }

  render() {
    const { searchData, isGettingData, isContentOver, isConnectionErr, countValue, maxCountValue } = this.state;

    return (
      <div className="main">
        <SearchInput 
          handleSearchChange={ this.handleSearchChange } 
          isGettingData={ isGettingData }
        />

        <div className="slider-container">
          <FiltersMenu 
            handleCountChange={ this.handleCountChange }
            handleMaxCountChange={ this.handleMaxCountChange }
            countValue={ countValue }
            maxCountValue={ maxCountValue }
          />

          <GifContainer
            searchData={ searchData }
            fillSlider={ this.fillSlider } 
            isContentOver={ isContentOver }
          />
        </div>
      </div>
    );
  }
}