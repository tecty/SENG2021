/*global google*/
import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import './Map.css';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox';
import NewPostButton from '../NewPostButton/NewPostButton';
import ConfirmButton from '../ConfirmButton/ConfirmButton';
import CancelButton from '../CancelButton/CancelButton';

const SiroundMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChange}
    onDragEnd={props.handleMapChange}
    onBoundsChanged={props.handleMapFullyLoaded}
    onCenterChanged={props.handleMapChange}
    defaultCenter={props.center}
    defaultZoom={props.zoom}
    defaultOptions={{
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    }}
    onClick={props.onPinPositionClick}
  >
    {props.places.length > 0 && props.places.map(place => (
      <PlaceMarker
        key={`place${place.id}`}
        position={place.position}
        name={'Event'}
        description={'Description'}
        tags={['#tag1', '#tag2']}
      />))}
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input className="SearchBox-input"
        type="text"
        placeholder="Customized your placeholder"
      />
    </SearchBox>
    {(props.pinMode || props.postMode) && 
    <Marker
      ref={props.onPinMounted}
      position={props.pinPosition}
      draggable={props.pinMode}
      title={"Drag me!"}
      onDragEnd={props.handlePinPositionChanged}
    />}
  </GoogleMap>
));

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.mapFullyLoaded = false
    this.zoom = 13

    this.state = {
      places: [],
      bounds: null,
      center: {
        lat: -33.9182861,
        lng: 151.2307079,
      },
      pinPosition: null,
      pinMode: false,
      postMode: false,
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleMapFullyLoaded = this.handleMapFullyLoaded.bind(this);

    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);

    this.handlePinMounted = this.handlePinMounted.bind(this);
    this.handlePinPositionChanged = this.handlePinPositionChanged.bind(this);
    this.handlePinPositionClick = this.handlePinPositionClick.bind(this);

    this.handleNewPostButtonClick = this.handleNewPostButtonClick.bind(this);
    this.handlePinConfirmButtonClick = this.handlePinConfirmButtonClick.bind(this);
    this.handlePinCancelButtonClick = this.handlePinCancelButtonClick.bind(this);
  }

  handleMapChange() {
    this.setMapBounds();
    this.setMapCenterPoint();
    this.fetchPlacesFromApi();
  }

  handleMapMounted(map) {
    this.map = map;
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded) 
      return;
    this.mapFullyLoaded = true;
    this.handleMapChange();
  }

  setMapCenterPoint() {
    this.setState({
      center: {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      }
    });
  }

  fetchPlacesFromApi() {
    const place1 = {
      id: 1,
      position: {
        lat: -33.9182861,
        lng: 151.2307079,
      },
      name: "Event",
      description: "Description",
      tags: ["#tag1", "#tag2"]
    };
    this.setState({places: [place1]});
  }

  handleSearchBoxMounted(searchBox) {
    this.searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    if (places.length > 0) {
      this.setState({
        bounds: bounds,
        center: {
          lat: places[0].geometry.location.lat(),
          lng: places[0].geometry.location.lng()
        }
      });
    }
    this.map.fitBounds(bounds);
  }
  
  handlePinMounted(pin) {
    this.pin = pin;
  }

  handlePinPositionChanged() {
    const position = this.pin.getPosition();
    if (position) {
      this.setState({
        pinPosition: {
          lat: position.lat(),
          lng: position.lng()
        }
      });
    }
  }

  handlePinPositionClick(e) {
    if (!this.state.pinMode) return;
    this.setState({
      pinPosition: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    })
  }

  handleNewPostButtonClick() {
    this.setState({
      pinMode: true,
      pinPosition: this.state.center
    });
  }

  handlePinConfirmButtonClick() {
    this.setState({
      pinMode: false,
      postMode: true
    });
  }

  handlePinCancelButtonClick() {
    this.setState({
      pinMode: false
    });
  }

  setMapBounds() {
    this.setState({
      bounds: this.map.getBounds(),
    });
    // var mapBounds = this.map.getBounds()
    // var xMapBounds = mapBounds.b
    // var yMapBounds = mapBounds.f

    // this.xMapBounds.min = xMapBounds.b
    // this.xMapBounds.max = xMapBounds.f

    // this.yMapBounds.min = yMapBounds.f
    // this.yMapBounds.max = yMapBounds.b
  }

  render() {
    const {center, places, pinPosition, pinMode, postMode} = this.state;
  const Button = (pinMode) ? 
      (<div>
        <CancelButton onClick={this.handlePinCancelButtonClick} />
        <ConfirmButton onClick={this.handlePinConfirmButtonClick} />
      </div>) :
      (postMode) ? null : 
      <NewPostButton onClick={this.handleNewPostButtonClick} />;

    return (
      <div className="Map">
        <SiroundMap
          onMapMounted={this.handleMapMounted}
          handleMapChange={this.handleMapChange}
          handleMapFullyLoaded={this.handleMapFullyLoaded}
          center={center}
          zoom={this.zoom}
          containerElement={< div className = "Map-containerElement" />}
          mapElement={< div className = "Map-mapElement" />}
          places={(postMode || pinMode) ? [] : places}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          onPlacesChanged={this.handlePlacesChanged}
          pinPosition={pinPosition}
          pinMode={pinMode}
          postMode={postMode}
          onPinMounted={this.handlePinMounted}
          handlePinPositionChanged={this.handlePinPositionChanged}
          onPinPositionClick={this.handlePinPositionClick}
        />
        {Button}
      </div>
    );
  }
}