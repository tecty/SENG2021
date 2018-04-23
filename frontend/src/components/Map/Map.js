/*global google*/
import React, {Component} from 'react';
import {withGoogleMap, GoogleMap} from 'react-google-maps';
import './Map.css';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox';

const SiroundMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChange}
    onDragEnd={props.handleMapChange}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom}
    defaultOptions={{
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    }}
  >
    {props.places.length > 0 && props.places.map(place => (
      <PlaceMarker
        key={`place${place.id}`}
        id={place.id}
        lat={place.latitude}
        lng={place.longitude}
        name={'Event'}
        description={'Description'}
        tags={['#tag1', '#tag2']}
      />))}
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged} >
      <input className="SearchBox-input"
        type="text"
        placeholder="Customized your placeholder"
      />
    </SearchBox>
  </GoogleMap>
));

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.xMapBounds = {
      min: null,
      max: null
    }
    this.yMapBounds = {
      min: null,
      max: null
    }

    this.mapFullyLoaded = false
    this.zoom = 13

    this.state = {
      places: [],
      bounds: null,
      lat: -33.9182861,
      lng: 151.2307079
    };
    this.handleMapMounted = this.handleMapMounted.bind(this)
    this.handleMapChange = this.handleMapChange.bind(this)
    this.handleMapFullyLoaded = this.handleMapFullyLoaded.bind(this)

    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this)
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this)
  }

  handleMapChange() {
    this.setMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded) 
      return
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
    this.setState({places: [place1]})
  }

  handleSearchBoxMounted(searchBox) {
    this.searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });

    if (places.length > 0) {
      this.setState({
        bounds: bounds,
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng()
      })
    }
    this.map.fitBounds(bounds);
  }

  setMapBounds() {
    this.setState({
      bounds: this.map.getBounds(),
    })
    // var mapBounds = this.map.getBounds()
    // var xMapBounds = mapBounds.b
    // var yMapBounds = mapBounds.f

    // this.xMapBounds.min = xMapBounds.b
    // this.xMapBounds.max = xMapBounds.f

    // this.yMapBounds.min = yMapBounds.f
    // this.yMapBounds.max = yMapBounds.b
  }

  render() {
    const {lat, lng, places} = this.state;

    return (
      <div className="Map">
        <SiroundMap
          onMapMounted={this.handleMapMounted}
          handleMapChange={this.handleMapChange}
          handleMapFullyLoaded={this.handleMapFullyLoaded}
          center={{
          lat: lat,
          lng: lng
        }}
          zoom={this.zoom}
          containerElement={< div className = "Map-containerElement" />}
          mapElement={< div className = "Map-mapElement" />}
          places={places}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          onPlacesChanged={this.handlePlacesChanged}
        >
        </SiroundMap>
      </div>
    );
  }
}