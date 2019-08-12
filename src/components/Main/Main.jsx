import React from 'react';
import SearchInput from '../SearchInput';
import FiltersMenu from '../FiltersMenu';
import GifContainer from '../GifContainer';
import './main.scss'; 


export default class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchRequest: '',
      autoCompleteValues: [],
      isGettingData: false,
      chunkSize: 50,
      maxCountValue: 1000,
    }
  }

  handleSearchChange = (event, data) => {
    console.log(event, data);
    const newSearchRequest = event.target.value;
    const { searchRequest } = this.state;
    clearInterval(this.timer);

    if(newSearchRequest === searchRequest) return;

    this.timer = setTimeout( () => {

      let requests = localStorage.getItem('requests');

      requests = requests ? JSON.parse(requests) : [];

      if(!requests.includes(newSearchRequest)) {
        requests.push( newSearchRequest );
        if(requests.length > 20) requests.shift();
        localStorage.setItem('requests', JSON.stringify(requests));
      }

      this.setState({
        searchRequest: newSearchRequest,
        autoCompleteValues: requests,
      });
    }, 1000);
  }

  toggleGettingData = () => {
      const { isGettingData } = this.state;
      this.setState({ isGettingData: !isGettingData });
  }

  handleChunkSizeChange = (event) => {
    const value = event.target.value;
    const count = value.replace(/[^0-9.]/g, '');

    this.setState({ chunkSize: count });
  }

  handleMaxCountChange = (event) => {
    const value = event.target.value;
    const count = value.replace(/[^0-9]/g, '');

    this.setState({ maxCountValue: count });
  }

  render() {
    const { searchRequest, isGettingData, chunkSize, maxCountValue, autoCompleteValues } = this.state;

    return (
      <div className="main">
        <SearchInput
          searchRequest={ searchRequest }
          handleSearchChange={ this.handleSearchChange } 
          isGettingData={ isGettingData }
          autoCompleteValues={ autoCompleteValues }
        />

        <FiltersMenu 
          handleCountChange={ this.handleChunkSizeChange }
          handleMaxCountChange={ this.handleMaxCountChange }
          chunkSize={ chunkSize }
          maxCountValue={ maxCountValue }
        />

        <GifContainer
          searchRequest={ searchRequest }
          isGettingData={ isGettingData }
          toggleGettingData={ this.toggleGettingData }
          chunkSize={ chunkSize }
          maxCountValue={ maxCountValue }
          key={ searchRequest }
        />
      </div>
    );
  }
}