import React from 'react';
import SearchInput from './SearchInput';
import FiltersMenu from './FiltersMenu';
import GifContainer from './GifContainer';
import ErrorScreen from './ErrorScreen';
import constants from '../constants';


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
      maxCountValue: 100,
    }

    this.offset = 0;
    this.total_count = 0;
    
  }


  handleSearchChange = async (event) => {
    const searchRequest = event.target.value;
    const data = await this.getData(searchRequest)

    this.searchRequest = searchRequest;
    this.giphyOffset = 0;
    this.setState({ 
      searchData: data.data,
      isContentOver: false,
    });
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

    if(this.offset >= this.total_count) this.setState({isContentOver: true});

    this.setState({ searchData: newSearchData });
  
  }

  toggleGettingData = () => {
    const { isGettingData } = this.state;
    this.setState({ isGettingData: !isGettingData });
  }

  getData = async (request) => {
    const { countValue } = this.state;
    const url = `${constants.giphyDomain}.${request}&api_key=${constants.APIKey}&limit=${countValue}&offset=${this.offset}`;

    this.toggleGettingData();
  
    const data = await fetch(url)
      .then(res => res.json())
      .catch(err => this.setState({ isConnectionErr: true }));

    this.toggleGettingData();

    this.offset += countValue;
    this.total_count = data.pagination.total_count;

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

        {isConnectionErr && <ErrorScreen />}
      </div>
    );
  }
}