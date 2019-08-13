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
      isGettingData: false,
      chunkSize: 50,
      maxCountValue: 1000,
    }
  }

  handleSearchChange = newSearchRequest => {
    this.setState({ searchRequest: newSearchRequest });
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
    const { searchRequest, isGettingData, chunkSize, maxCountValue } = this.state;

    return (
      <div className="main">
        <SearchInput
          handleSearchChange={ this.handleSearchChange } 
          isGettingData={ isGettingData }
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