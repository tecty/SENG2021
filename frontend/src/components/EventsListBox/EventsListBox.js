import React, { Component } from 'react';
import './EventsListBox.css';
import EventsList from '../EventsList/EventsList';
import EventDetail from '../EventDetail/EventDetail';

export default class EventsListBox extends Component {
  render() {
    const {places, showEventDetail, eventDetail, handleEventDetailClick, handleEventDetailBackClick} = this.props;
    return (
      <div className="EventsListBox">
        <EventsList 
          listData={places}
          onEventDetailClick={handleEventDetailClick}
        />
        {showEventDetail &&
          <EventDetail 
            onBackButtonClick={handleEventDetailBackClick}
            event={eventDetail}
          />
        }
      </div>
    );
  }  
}