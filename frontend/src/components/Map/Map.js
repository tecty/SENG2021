import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
export default class Map extends Component {
  static defaultProps = {
    center: {lat: -33.92, lng: 151.23},
    zoom: 15
  };
 
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDhCTfzOuoPtFNvCc75_x_lOXFHANYSCiI' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
      </GoogleMapReact>
    );
  }
}
