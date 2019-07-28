import React from 'react';
import PropTypes from 'prop-types';
import GifModalWindow from './GifModalWindow';


export default class GifCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalMenuActive: false,
    }
  }

  handleClick = () => {
    const { isModalMenuActive } = this.state;

    this.setState({ isModalMenuActive: !isModalMenuActive });
  }

  render() {
    const { isModalMenuActive } = this.state;
    const { data } = this.props;

    return (
      <div className='card-container'>
        <div className="gif-card" >
          <img
            src={ data.url }
            alt='some gif'
            className="card-gif"
            onClick={ this.handleClick }
          />
        </div>

        {isModalMenuActive && <GifModalWindow data={ data } />}
      </div>
    );
  }
}

GifCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};
