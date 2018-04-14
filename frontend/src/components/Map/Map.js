import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
 
const SiroundMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={props.center}
    defaultZoom={props.zoom}>
    {props.places}
  </GoogleMap>
));

export default class Map extends Component {
  constructor(props) {
    super(props)
 
    this.zoom = 7
 
    this.state = {
      lat: -33.9182861,
      lng: 151.2307079
    };
  }
 
  render() {
    const {lat, lng} = this.state;
    const places = [<PlaceMarker lat={lat} lng={lng} price={20} />];
 
    return(
      <div style={{width: `100%`, height: `750px`}}>
        <SiroundMap
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          places={places}
        />
      </div>
    );
  }
}