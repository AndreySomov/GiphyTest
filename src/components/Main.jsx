import React from 'react';
import Input from './Input';
import GifContainer from './GifContainer';
import ErrorScreen from './ErrorScreen';
import giphyLogo from '../assets/images/giphy.gif';
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
    }

    this.offset = 0;
    this.total_count = 0;
    
  }


  handleChange = async (event) => {
    const searchRequest = event.target.value;
    const data = await this.getData(searchRequest)

    this.searchRequest = searchRequest;
    this.giphyOffset = 0;
    this.setState({ searchData: data.data });
  }

  fillSlider = async () => {
    
    const { isGettingData, searchData, isContentOver } = this.state;

    if(isContentOver || isGettingData) return;

    this.toggleGettingData();
    const newData = await this.getData(this.searchRequest);
    const newSearchData = searchData.concat(newData.data);

    if(this.offset >= this.total_count) this.setState({isContentOver: !isContentOver});

    this.setState({ searchData: newSearchData });
  
    this.toggleGettingData();
  }

  toggleGettingData = () => {
    const { isGettingData } = this.state;
    this.setState({ isGettingData: !isGettingData });
  }

  getData = async (request) => {
    const url = `${constants.giphyDomain}.${request}&api_key=${constants.APIKey}&limit=${constants.dataChunkSize}&offset=${this.offset}`;
    const data = await fetch(url)
      .then(res => res.json())
      .catch(err => this.setState({ isConnectionErr: true }));

    this.offset += constants.dataChunkSize;
    this.total_count = data.pagination.total_count;

    return data;
  }

  render() {
    const { searchData, isGettingData, isContentOver, isConnectionErr } = this.state;

    return (
      <div className="main">
        <Input handleChange={ this.handleChange } />

        {searchData.length !== 0 &&
          <GifContainer
            searchData={ searchData } 
            isGettingData={ isGettingData }
            fillSlider={ this.fillSlider } 
            isContentOver={ isContentOver }
          />
        }

        {isConnectionErr && <ErrorScreen />}

        {searchData.length === 0 && isConnectionErr && <img src={giphyLogo} alt="giphyLogo" className='giphy-logo' width='800' height='400' />}
      </div>
    );
  }
}