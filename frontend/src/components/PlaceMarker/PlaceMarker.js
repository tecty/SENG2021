import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import PlaceInfoWindow from '../PlaceInfoWindow/PlaceInfoWindow';
 
export default class PlaceMarker extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      showTooltip: false
    }
    this.clickTooltip = this.clickTooltip.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }
 
  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip })
  }
 
  closeWindow() {
    this.setState({ showTooltip: false })
  }

  render() {
    const {showTooltip} = this.state;
    const {lat, lng, name, tags, description} = this.props
 
    return(
      <Marker
        position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
        onClick={this.clickTooltip}>
        {showTooltip && (<PlaceInfoWindow 
          description={description}
          name={name}
          tags={tags}
          closeWindow={this.closeWindow}
        />)}
      </Marker>
    );
  }
}