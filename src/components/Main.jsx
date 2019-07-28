import React from 'react';
import Input from './Input';
import GifContainer from './Slider';
import giphyLogo from '../assets/images/giphy.gif';
import constants from '../constants';


export default class Main extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      searchData: [],
    }

    this.offset = 0;
  }

  handleChange = async (event) => {
    const searchRequest = event.target.value;
    const data = await this.getData(searchRequest)

    this.searchRequest = searchRequest;
    this.giphyOffset = 0;
    this.setState({ searchData: data.data });
  }

  fillSlider = async () => {
    const { searchData } = this.state;
    const newData = await this.getData(this.searchRequest);
    const newSearchData = searchData.concat(newData.data);

    this.setState({ searchData: newSearchData });
  }

  getData = async (request) => {
    const url = `${ constants.giphyDomain }.${request}&api_key=${ constants.APIKey }&limit=${ constants.dataChunkSize }&offset=${ this.giphyOffset }`;

    this.giphyOffset += constants.dataChunkSize;
    return await fetch(url).then(res => res.json());
  }

  render() {
    const { searchData } = this.state;

    return (
      <div className="main">
        <Input handleChange={ this.handleChange } />

        {searchData.length !== 0 && <GifContainer searchData={ searchData } fillSlider={ this.fillSlider } />}
        {searchData.length === 0 && <img src={ giphyLogo } alt="giphyLogo" className='giphy-logo' width='800' height='400' />}
      </div>
    );
  }
}