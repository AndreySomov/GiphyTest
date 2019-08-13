import React from 'react';
import Autosuggest from 'react-autosuggest';
import Loading from "../Loading";
import './searchInput.scss';


export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
        };
    }

    getSuggestions = (value) => {
        const searchRequest = value.trim();
        const autoCompleteValues = JSON.parse(localStorage.getItem('autoCompleteValues'));

        if (!searchRequest || !autoCompleteValues) return [];

        const regex = new RegExp('^' + searchRequest, 'i');


        return autoCompleteValues.filter(value => regex.test(value.value));
    }


    onChange = (event, { newValue, method }) => {
        clearInterval(this.timer);
        const { handleSearchChange } = this.props;

        this.setState({ value: newValue });

        this.timer = setTimeout(() => {

            const autoCompleteValues = Array.from(JSON.parse(localStorage.getItem('autoCompleteValues')) || []);


            if(!autoCompleteValues.some(item => item.value === newValue)) {

                autoCompleteValues.push({ value: newValue, rating: 0 })

            } else {

                autoCompleteValues.forEach(item => { if (item.value === newValue) { item.rating += 1 }});

            }

            localStorage.setItem('autoCompleteValues', JSON.stringify(autoCompleteValues.sort((a, b) => b.rating - a.rating)));
            handleSearchChange(newValue);
        }, 700);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const { isGettingData } = this.props;
        const inputProps = {
            placeholder: "Giphy search...",
            value,
            onChange: this.onChange
        };

        return (
            <div className='search-container'>
                <Autosuggest
                    suggestions={ suggestions }
                    onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
                    onSuggestionsClearRequested={ () => this.setState({ suggestions: [] })}
                    getSuggestionValue={ suggestion => suggestion.value }
                    renderSuggestion={ suggestion => <span>{ suggestion.value }</span> }
                    inputProps={ inputProps }
                />
                {isGettingData && <Loading />}
            </div>

        );
    }
}
