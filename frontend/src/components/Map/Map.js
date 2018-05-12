/*global google*/
import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import './Map.css';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
// import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import NewPostButton from '../NewPostButton/NewPostButton';
import ConfirmButton from '../ConfirmButton/ConfirmButton';
import CancelButton from '../CancelButton/CancelButton';
import NewPostForm from '../NewPostForm/NewPostForm';
import eventBrite from '../../utils/eventBrite';
import AreaSearchButton from '../AreaSearchButton/AreaSearchButton';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import EventsListButton from '../EventsListButton/EventsListButton';
import SearchBar from '../SearchBar/SearchBar';
import EventsListBox from '../EventsListBox/EventsListBox';

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
      mapTypeControl: false,
      fullscreenControl: false,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    }}
    onClick={props.onPinPositionClick}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.places.length > 0 && !props.showEventDetail && props.places.map(place => (
        <PlaceMarker
          key={`place${place.id}`}
          place={place}
          onClick={props.onPinClick}
        />))
      }
    </MarkerClusterer>
    {props.showEventDetail && !(props.pinMode || props.postMode) &&
      <PlaceMarker
        key={`eventDetail${props.eventDetail.id}`}
        place={props.eventDetail}
        onClick={props.onPinClick}
      />
    }
    {/* <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input className="SearchBox-input"
        type="text"
        placeholder="Enter place"
      />
    </SearchBox> */}
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
      posts:[],
      bounds: null,
      center: {
        lat: -33.9182861,
        lng: 151.2307079,
      },
      pinPosition: null,
      pinMode: false,
      postMode: false,
      postSubmitting: false,
      placesLoaded: false,
      showList: true,
      showEventDetail: false,
      eventDetail: {},
    };
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleMapFullyLoaded = this.handleMapFullyLoaded.bind(this);
    this.fetchPlacesFromApi = this.fetchPlacesFromApi.bind(this);

    // this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);

    this.handlePinMounted = this.handlePinMounted.bind(this);
    this.handlePinPositionChanged = this.handlePinPositionChanged.bind(this);
    this.handlePinPositionClick = this.handlePinPositionClick.bind(this);

    this.handleNewPostButtonClick = this.handleNewPostButtonClick.bind(this);
    this.handlePinConfirmButtonClick = this.handlePinConfirmButtonClick.bind(this);
    this.handlePinCancelButtonClick = this.handlePinCancelButtonClick.bind(this);
    this.handleCloseNewPostForm = this.handleCloseNewPostForm.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);

    this.handleEventDetailClick = this.handleEventDetailClick.bind(this);
    this.handleEventDetailBackClick = this.handleEventDetailBackClick.bind(this);
    this.handlePinClick = this.handlePinClick.bind(this);
    this.handleEventsListButtonClick = this.handleEventsListButtonClick.bind(this);
  }

  handleMapChange() {
    this.setMapBounds();
    this.setMapCenterPoint();
    //this.fetchPlacesFromApi();
    this.setState({
      placesLoaded: false
    })
  }

  handleMapMounted(map) {
    console.log(map);
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
    console.log(this.state.bounds);
    const bounds = this.state.bounds;
    eventBrite.searchEventsByLocation([
      {
        "Latitude": `${bounds.f.f}`,
        "Longitude": `${bounds.b.f}`
      },
      {
        "Latitude": `${bounds.f.b}`,
        "Longitude": `${bounds.b.b}`
      }
    ]).then(events => {
      console.log(events);
      
      const posts = this.state.posts.filter(post => {
        return (post.position.lat <= bounds.f.f && 
        post.position.lat >= bounds.f.b &&
        post.position.lng <= bounds.b.f &&
        post.position.lng >= bounds.b.b)
      })

      this.setState({
        places: posts.concat(events),
        placesLoaded: true,
        showEventDetail: false,
        showList: true,
      })
    })
  }

  // handleSearchBoxMounted(searchBox) {
  //   this.searchBox = searchBox;
  // }

  handlePlacesChanged(places) {
    //const places = this.searchBox.getPlaces();
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

  handlePostSubmit(newPost) {
    this.setState({
      postSubmitting: true 
    });
    const post = {
      ...newPost,
      position: this.state.pinPosition,
      id: this.state.places.length
    }
    // console.log(post);
    setTimeout(() =>{
      this.setState({
        postSubmitting: false,
        postMode: false,
        places: [post, ...this.state.places],
        posts: [...this.state.posts, post],
        placesLoaded: true,
        showEventDetail: true,
        showList: true,
        eventDetail: post,
      });
    }, 1000);
  }

  handleCloseNewPostForm() {
    this.setState({
      pinMode: false,
      postMode: false
    })
  }

  setMapBounds() {
    this.setState({
      bounds: this.map.getBounds(),
    });
    // console.log(this.state.bounds);
    // var mapBounds = this.map.getBounds()
    // var xMapBounds = mapBounds.b
    // var yMapBounds = mapBounds.f

    // this.xMapBounds.min = xMapBounds.b
    // this.xMapBounds.max = xMapBounds.f

    // this.yMapBounds.min = yMapBounds.f
    // this.yMapBounds.max = yMapBounds.b
  }

  handleEventDetailClick(eventDetail) {
    this.handlePinClick(eventDetail);
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(eventDetail.position);
    console.log(this.map);
    this.map.fitBounds(bounds);
    this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setZoom(17);
  }

  handlePinClick(place) {
    this.setState({
      showEventDetail: true,
      showList: true,
      eventDetail: place,
    })
  }

  handleEventDetailBackClick() {
    this.setState({
      showEventDetail: false,
    });
  }

  handleEventsListButtonClick() {
    this.setState({
      showList: !this.state.showList,
    })
  }

  render() {
    const {center, places, pinPosition, pinMode, postMode, postSubmitting, placesLoaded, showEventDetail, eventDetail, showList} = this.state;

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
          // onSearchBoxMounted={this.handleSearchBoxMounted}
          // onPlacesChanged={this.handlePlacesChanged}
          pinPosition={pinPosition}
          pinMode={pinMode}
          postMode={postMode}
          onPinMounted={this.handlePinMounted}
          handlePinPositionChanged={this.handlePinPositionChanged}
          onPinPositionClick={this.handlePinPositionClick}
          showEventDetail={showEventDetail}
          eventDetail={eventDetail}
          onPinClick={this.handlePinClick}
        />
        {(!pinMode && !postMode) &&
          <NewPostButton onClick={this.handleNewPostButtonClick} />
        }
        {pinMode &&
          (<div>
            <CancelButton onClick={this.handlePinCancelButtonClick} />
            <ConfirmButton onClick={this.handlePinConfirmButtonClick} />
          </div>)
        }
        <NewPostForm
          visible={postMode}
          loading={postSubmitting}
          onClose={this.handleCloseNewPostForm}
          onSubmit={this.handlePostSubmit}
        />
        {!placesLoaded && !(pinMode || postMode) &&
          <AreaSearchButton onClick={this.fetchPlacesFromApi}/>
        }
        {!(pinMode || postMode) && <EventsListButton
          onClick={this.handleEventsListButtonClick}
          show={(showList)}
        />}
        {showList && (places.length >0) && !(pinMode || postMode) && <EventsListBox 
          places={places}
          pinMode={pinMode}
          postMode={postMode}
          showList={showList}
          showEventDetail={showEventDetail}
          eventDetail={eventDetail}
          handleEventDetailClick={this.handleEventDetailClick}
          handleEventDetailBackClick={this.handleEventDetailBackClick}
          handleEventsListButtonClick={this.handleEventsListButtonClick}
        />}
        {showList && !(pinMode || postMode) && <SearchBar onPlacesChanged={this.handlePlacesChanged}/>}
      </div>
    );
  }
}