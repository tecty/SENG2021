/*global google*/
import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import './Map.css';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
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
import postApi from '../../utils/postApi';

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
    { !(props.pinMode || props.postMode) &&
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      // maxZoom={20}
      onClick={props.onClusterClick}
    >
      {props.places.length > 0 && !props.showEventDetail && !props.showUserPosts && props.places.map(place => (
        <PlaceMarker
          key={`place${place.id}`}
          place={place}
          onClick={props.onPinClick}
        />))
      }
      {props.userposts.length > 0 && !props.showEventDetail && props.showUserPosts && props.userposts.map(place => (
        <PlaceMarker
          key={`place${place.id}`}
          place={place}
          onClick={props.onPinClick}
        />))
      }
    </MarkerClusterer>}
    {props.showEventDetail && !(props.pinMode || props.postMode) &&
      <PlaceMarker
        key={`eventDetail${props.eventDetail.id}`}
        place={props.eventDetail}
        onClick={props.onPinClick}
      />
    }
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

    this.state = {
      zoom: 13,
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
      searchInput: '',
      placesAutoLoaded: true,
      // showUserPosts: false,
      // userposts: [],
      // userPostsAuthor: "",
    };
  }

  handleMapChange = () => {
    this.setMapBounds();
    this.setMapCenterPoint();
    //this.fetchPlacesFromApi();
    this.setState({
      placesLoaded: false,
      zoom: this.map.getZoom(),
    })
  }

  handleMapMounted = (map) => {
    this.map = map;
    this.autoLoadedChanged(false);
  }

  handleMapFullyLoaded = () => {
    if (this.mapFullyLoaded) 
      return;
    this.mapFullyLoaded = true;
    this.handleMapChange();
  }

  setMapCenterPoint = () => {
    this.setState({
      center: {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      }
    });
  }

  fetchPlacesFromApi = () => {
    console.log(this.state.bounds);
    const bounds = this.state.bounds;
    const data = [
      {
        "Latitude": `${bounds.f.f}`,
        "Longitude": `${bounds.b.f}`
      },
      {
        "Latitude": `${bounds.f.b}`,
        "Longitude": `${bounds.b.b}`
      }
    ]
    // this.setState({showList: false})
    this.props.handleShowListChanged(false)
    postApi.getPostByBound(data).then(posts => {
      // console.log(posts);
      eventBrite.searchEventsByLocation(data).then(events => {
        console.log(events);
        // console.log(posts.concat(events))
        
        this.setState({
          places: posts.concat(events),
          // places: events,
          post: [],
          placesLoaded: true,
          showEventDetail: false,
          // showList: true,
        })
        this.props.handleShowListChanged(true)
      })
    })
    console.log(this.state.places)


  }

  handlePlacesChanged = (places) => {
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
  
  handlePinMounted = (pin) => {
    this.pin = pin;
  }

  handlePinPositionChanged = () => {
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

  handlePinPositionClick = (e) => {
    if (!this.state.pinMode) return;
    this.setState({
      pinPosition: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    })
  }

  handleNewPostButtonClick = () => {
    this.setState({
      pinMode: true,
      pinPosition: this.state.center
    });
  }

  handlePinConfirmButtonClick = () => {
    this.setState({
      pinMode: false,
      postMode: true
    });
  }

  handlePinCancelButtonClick = () => {
    this.setState({
      pinMode: false
    });
  }

  handlePostSubmit = (newPost) => {
    this.setState({
      postSubmitting: true 
    });
    const post = {
      ...newPost,
      position: this.state.pinPosition,
      author: this.props.user.username,
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
        eventDetail: post,
      });
      this.props.handleShowListChanged(true)
      this.props.handleAddUserPost(post)
    }, 1000);
  }

  handleCloseNewPostForm = () => {
    this.setState({
      pinMode: false,
      postMode: false
    })
  }

  setMapBounds = () => {
    this.setState({
      bounds: this.map.getBounds(),
    });
  }

  handleEventDetailClick = (eventDetail) => {
    this.handlePinClick(eventDetail);
    let bounds = new google.maps.LatLngBounds();
    bounds.extend(eventDetail.position);
    // console.log(this.state.zoom);
    this.map.fitBounds(bounds);
    this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setZoom(this.state.zoom);
  }

  handlePinClick = (place) => {
    this.setState({
      showEventDetail: true,
      eventDetail: place,
    })
    this.props.handleShowListChanged(true)
  }

  handleEventDetailBackClick = () => {
    this.setState({
      showEventDetail: false,
    });
  }

  handleEventsListButtonClick = () => {
    this.props.handleShowListChanged(!this.props.showList)
  }

  handleSearchInputChanged = searchInput => {
    this.setState({
      searchInput: searchInput,
    })
  }

  autoLoadedChanged = (state) => {
    this.setState({ placesAutoLoaded: state});
  }

  onClusterClick = () => {
    this.handleMapChange();
  }

  handleShowUserPostsChanged = (state, name) => {
    this.props.handleShowUserPostsChanged(state, name)
  }
  
  handleDeletePost = (id) => {
    this.setState({
      places: this.state.places.filter(post => post.id !== id)
    })
    this.props.handleDeletePost(id);
  }

  render() {
    const {
      zoom,
      center, 
      places, 
      pinPosition, 
      pinMode, 
      postMode, 
      postSubmitting, 
      placesLoaded, 
      showEventDetail, 
      eventDetail, 
      searchInput,
      placesAutoLoaded,
    } = this.state;

    const { showUserPosts, userPostsAuthor, userposts, showList } = this.props;

    return (
      <div className="Map">
        {/* {console.log(this.props.authorized)} */}
        <SiroundMap
          onMapMounted={this.handleMapMounted}
          handleMapChange={this.handleMapChange}
          handleMapFullyLoaded={this.handleMapFullyLoaded}
          center={center}
          zoom={zoom}
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
          onClusterClick={this.onClusterClick}
          userposts={userposts}
          showUserPosts={showUserPosts}
        />
        {this.props.authorized && (!pinMode && !postMode) &&
          <NewPostButton onClick={this.handleNewPostButtonClick} />
        }
        {this.props.authorized && pinMode &&
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
          location={pinPosition}
        />
        {this.mapFullyLoaded && !placesLoaded && !(pinMode || postMode) &&
          <AreaSearchButton 
            onClick={this.fetchPlacesFromApi}
            autoloaded={placesAutoLoaded}
            autoLoadedChanged={this.autoLoadedChanged}
          />
        }
        {!(pinMode || postMode) && <EventsListButton
          onClick={this.handleEventsListButtonClick}
          show={(showList)}
        />}
        {showList && (places.length >0) && !(pinMode || postMode) && <EventsListBox 
          places={places}
          showEventDetail={showEventDetail}
          eventDetail={eventDetail}
          handleEventDetailClick={this.handleEventDetailClick}
          handleEventDetailBackClick={this.handleEventDetailBackClick}
          handleEventsListButtonClick={this.handleEventsListButtonClick}
          user={this.props.user}
          author={userPostsAuthor}
          showUserPosts={showUserPosts}
          userposts={userposts}
          handleShowUserPostsChanged={this.handleShowUserPostsChanged}
          handleDeletePost={this.handleDeletePost}
          // handleUserPostsAuthorChanged={this.handleUserPostsAuthorChanged}
        />}
        {showList && !(pinMode || postMode) &&
          <SearchBar 
            onPlacesChanged={this.handlePlacesChanged}
            onSearchInputChanged={this.handleSearchInputChanged}
            searchInput={searchInput}
            autoLoadedChanged={this.autoLoadedChanged}
          />
        }
      </div>
    );
  }
}