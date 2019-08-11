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
      // isContentOver: false,
      // isConnectionErr: false,
      // countValue: 40,
      // maxCountValue: 1000,
    }
  }


  handleSearchChange = (event) => {
    const newSearchRequest = event.target.value;
    const { searchRequest } = this.state;
  
    clearInterval(this.timer);

    this.timer = setTimeout( () => {
    
      if(newSearchRequest === searchRequest) return;

      this.setState({ searchRequest: newSearchRequest });

    }, 500);
  }

  // handleCountChange = (event) => {
  //   const value = event.target.value;
  //   const count = +value.replace(/[^0-9]/, '');

  //   this.setState({countValue: Math.max(1, count)});
  // }

  // handleMaxCountChange = (event) => {
  //   const value = event.target.value;
  //   const count = +value.replace(/[^0-9]/, '');

  //   this.setState({maxCountValue: Math.max(1, count)});
  // }

  render() {
    const { searchRequest, isGettingData, isContentOver, countValue, maxCountValue } = this.state;

    return (
      <div className="main">
        <SearchInput 
          handleSearchChange={ this.handleSearchChange } 
          isGettingData={ isGettingData }
        />

        <FiltersMenu 
          handleCountChange={ this.handleCountChange }
          handleMaxCountChange={ this.handleMaxCountChange }
          countValue={ countValue }
          maxCountValue={ maxCountValue }
        />

        <GifContainer
          searchRequest={ searchRequest }
          isContentOver={ isContentOver }
          key={ searchRequest }
        />
      </div>
    );
  }
}