import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
// import PlaceInfoWindow from '../PlaceInfoWindow/PlaceInfoWindow';
 
export default class PlaceMarker extends Component {
  // constructor(props) {
    // super(props)
 
    // this.state = {
    //   showTooltip: false
    // }
    // this.clickTooltip = this.clickTooltip.bind(this);
    // this.closeWindow = this.closeWindow.bind(this);
  // }
 
  clickTooltip(place) {
    // this.setState({ showTooltip: !this.state.showTooltip })
    console.log(this.props)
    this.props.onClick(place);
  }
 
  // closeWindow() {
  //   this.setState({ showTooltip: false })
  // }

  render() {
    // const {showTooltip} = this.state;
    const {place} = this.props
 
    return(
      <Marker
        position={place.position}
        onClick={this.clickTooltip.bind(this, place)}>
        {/* {showTooltip && (<PlaceInfoWindow 
          description={description}
          name={name}
          tags={tags}
          closeWindow={this.closeWindow}
        />)} */}
      </Marker>
    );
  }
}