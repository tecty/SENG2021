import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './Map.css';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
 
const SiroundMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChange}
    onDragEnd={props.handleMapChange}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom}>
    {props.places.length > 0 && props.places.map(place => (
      <PlaceMarker
        key={`place${place.id}`}
        id={place.id}
        lat={place.latitude}
        lng={place.longitude}
        name={'Event'}
        description={'Description'}
        tags={['#tag1', '#tag2']} />
    ))}
  </GoogleMap>
));

export default class Map extends Component {
  constructor(props) {
    super(props)
 
    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 7
 
    this.state = {
      places: [],
      lat: -33.9182861,
      lng: 151.2307079
    };
    this.handleMapMounted = this.handleMapMounted.bind(this)
    this.handleMapChange = this.handleMapChange.bind(this)
    this.handleMapFullyLoaded = this.handleMapFullyLoaded.bind(this)
  }

  handleMapChange() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded) return 
    this.mapFullyLoaded = true
    this.handleMapChange()
  }

  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  fetchPlacesFromApi() {
    const place1 = {
      id: 1,
      latitude: -33.9182861,
      longitude: 151.2307079,
      name: "Event",
      description: "Description",
      tags: ["#tag1", "#tag2"]
    }
    this.setState({ places: [place1] })
  }
 
  getMapBounds() {
    var mapBounds = this.map.getBounds()
    var xMapBounds = mapBounds.b
    var yMapBounds = mapBounds.f
 
    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f
 
    this.yMapBounds.min = yMapBounds.f
    this.yMapBounds.max = yMapBounds.b
  }
  
  render() {
    const {lat, lng, places} = this.state;
 
    return(
      <div className="Map" >
        {/* for debugging  */}
        {/* <ul>
          <li>lng: {lng}</li>
          <li>lat: {lat}</li>
          <li>xMapBounds.min: {this.xMapBounds.min}</li>
          <li>xMapBounds.max: {this.xMapBounds.max}</li>
          <li>yMapBounds.min: {this.yMapBounds.min}</li>
          <li>yMapBounds.max: {this.yMapBounds.max}</li>
        </ul> */}
        <SiroundMap
          onMapMounted={this.handleMapMounted}
          handleMapChange={this.handleMapChange}
          handleMapFullyLoaded={this.handleMapFullyLoaded}
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