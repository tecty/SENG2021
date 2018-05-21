import React, { Component } from 'react';
import './EventsListBox.css';
import EventsList from '../EventsList/EventsList';
import EventDetail from '../EventDetail/EventDetail';
import EventsListFilter from '../EventsListFilter/EventsListFilter';

export default class EventsListBox extends Component {
  constructor (props) {
    super(props);

    this.state = {
      places : this.props.places,
      filteredPlaces: this.props.places,
      filterValue: "",
    }
  }

  handleFilteredPlacesChanged = (value) => {
    const filters = value.split(" ").filter((value) => value !== "");
    // console.log(filters);
    const filteredPlaces = (filters.length === 0) ? 
    this.state.places
    : this.state.places.filter(place => {
      for (let i = 0; i < filters.length; i++) {
        if (filters[i][0] === '#') {
          let flag = false;
          for(let j = 0; j < place.tags.length; j++) {
            if (place.tags[j].substr(0, filters[i].length-1).toLowerCase() === filters[i].substr(1).toLowerCase()) {
              flag = true;
              break;
            }
          }
          if (!flag) return false;
        } else {
          if (place.name.toLowerCase().indexOf(filters[i].toLowerCase()) === -1) return false;
        }
      }
      return true;
    })
    // console.log(filteredPlaces);
    this.setState({
      filteredPlaces: filteredPlaces,
    })
  } 

  handleFilterValueChanged = (value) => {
    this.setState( {filterValue: value, })
    this.handleFilteredPlacesChanged(value);
  }

  render() {
    const { showEventDetail, eventDetail, handleEventDetailClick, handleEventDetailBackClick } = this.props;
    const { places, filteredPlaces, filterValue } = this.state;
    return (
      <div className="EventsListBox">
        <EventsListFilter
          value={filterValue}
          handleValueChanged={this.handleFilterValueChanged}
          places={places}
        />
        <EventsList
          listData={filteredPlaces}
          onEventDetailClick={handleEventDetailClick}
          handleFilterValueChanged={this.handleFilterValueChanged}
        />
        {showEventDetail &&
          <EventDetail 
            handleFilterValueChanged={this.handleFilterValueChanged}
            onBackButtonClick={handleEventDetailBackClick}
            event={eventDetail}
          />
        }
      </div>
    );
  }  
}