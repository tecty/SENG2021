import React, { Component } from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { Icon } from 'antd';
import { classnames } from './helpers';
import './SearchBar.css';

export default class SearchBar extends Component {
  handleChange = address => {
    this.props.onSearchInputChanged(address);
  };

  handleSelect = selected => {
    geocodeByAddress(selected)
      .then(res => {
        this.props.onPlacesChanged(res);
      })
      .catch(error => {
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.props.onSearchInputChanged('');
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    clearSuggestions();
  };

  render() {
    const { searchInput } = this.props;

    return (
      <div className="SearchBar">
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={searchInput}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={searchInput.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="SearchBar-container">
                <div className="SearchBar-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'SearchBar-input',
                    })}
                  />
                  {searchInput.length > 0 && (
                    <button
                      className="SearchBar-clear-button"
                      onClick={this.handleCloseClick}
                    >
                      <Icon type="close" />
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="SearchBar-autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('SearchBar-suggestion-item', {
                        'SearchBar-suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="SearchBar-dropdown-footer">
                      <div>
                        <img
                          src={require('./powered_by_google_default.png')}
                          className="SearchBar-dropdown-footer-image"
                          alt="powered by google"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
      </div>
    );
  }
}