import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './Map.css';
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
    const places = [<PlaceMarker lat={lat} lng={lng} tags={["#tag1", "#tag2"]} name={"Event"} description={"Description"} key={1}/>];
 
    return(
      <div className="Map" >
        <SiroundMap
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={this.zoom}
          containerElement={
            <div className="Map-containerElement" />
          }
          mapElement={
            <div className="Map-mapElement" />
          }
          places={places}
        />
      </div>
    );
  }
}