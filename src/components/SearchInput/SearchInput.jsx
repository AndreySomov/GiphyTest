import React from 'react';
import Loading from "../Loading";
import { Dropdown } from 'semantic-ui-react'
import './searchInput.scss';



export default function SearchInput({ handleSearchChange, isGettingData, autoCompleteValues }) {
    const completeValues = autoCompleteValues.map(item => ({ text: item }));

  return(
      <div className='searchInput-container'>
          <Dropdown
              fluid
              multiple
              search
              selection
              options={ completeValues }
              onChange={ handleSearchChange }
              onInput={ handleSearchChange }
              placeholder='Giphy search...'
          />
          { isGettingData && <Loading /> }
      </div>
  );
}