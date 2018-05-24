import React, { Component } from 'react';
import './EventsListBox.css';
import EventsList from '../EventsList/EventsList';
import EventDetail from '../EventDetail/EventDetail';
import EventsListFilter from '../EventsListFilter/EventsListFilter';
import UserPosts from '../UserPosts/UserPosts';

export default class EventsListBox extends Component {
  constructor (props) {
    super(props);

    this.state = {
      places : this.props.places,
      filteredPlaces: this.props.places,
      filterValue: "",
      posts: this.props.userposts,
      filteredPosts: this.props.userposts,
      filterPostValue: "",
    }
  }

  handleFilteredPlacesChanged = (value, post_option) => {
    const events = (post_option) ? this.state.posts : this.state.places;
    const filters = value.split(" ").filter((value) => value !== "");
    // console.log(filters);
    const filteredPlaces = (filters.length === 0) ? events
    : events.filter(place => {
      for (let i = 0; i < filters.length; i++) {
        if (filters[i][0] === '#') {
          let flag = false;
          for(let j = 0; j < place.tags.length; j++) {
            if (place.tags[j].substr(0, filters[i].length-1).toLowerCase() === filters[i].substr(1).toLowerCase()) {
              flag = true;
              break;
            }
          }
          if (!flag) return false;
        } else {
          if (place.name.toLowerCase().indexOf(filters[i].toLowerCase()) === -1) return false;
        }
      }
      return true;
    })
    // console.log(filteredPlaces);
    if (post_option) {
      this.setState({
        filteredPosts: filteredPlaces
      })
    } else {
      this.setState({
        filteredPlaces: filteredPlaces,
      })
    }
  } 

  handleFilterValueChanged = (value, post_option) => {
    if (post_option) {
      this.setState({filterPostValue: value})
    } else {
      this.setState( {filterValue: value, })
    }
    this.handleFilteredPlacesChanged(value, post_option);
  }

  handleDeletePost = (id) => {
    this.props.handleDeletePost(id)
    this.setState({
      filteredPosts: this.state.filteredPosts.filter(post => post.id !== id),
      posts: this.state.posts.filter(post => post.id !== id)
    })
  }

  render() {
    const {
      user,
      showEventDetail, 
      eventDetail,
      handleEventDetailClick,
      handleEventDetailBackClick,
      showUserPosts,
      handleShowUserPostsChanged,
      author,
      // handleUserPostsAuthorChanged
    } = this.props;

    const { 
      places,
      filteredPlaces,
      filterValue,
      posts,
      filteredPosts,
      filterPostValue
    } = this.state;
    
    return (
      <div className="EventsListBox">
        <EventsListFilter
          value={filterValue}
          handleValueChanged={this.handleFilterValueChanged}
          places={places}
        />
        {!showEventDetail && !showUserPosts &&
        <EventsList
          listData={filteredPlaces}
          onEventDetailClick={handleEventDetailClick}
          handleFilterValueChanged={this.handleFilterValueChanged}
          // handleUserPostsAuthorChanged={handleUserPostsAuthorChanged}
          handleShowUserPostsChanged={handleShowUserPostsChanged}
        />}
        {showUserPosts &&
          <UserPosts 
            handleShowUserPostsChanged={handleShowUserPostsChanged}
            onEventDetailClick={handleEventDetailClick}
            user={user}
            author={author}
            filteredPosts={filteredPosts}
            filterValue={filterPostValue}
            handleValueChanged={this.handleFilterValueChanged}
            posts={posts}
            handleDeletePost={this.handleDeletePost}
          />
        }
        {showEventDetail &&
          <EventDetail 
            handleFilterValueChanged={this.handleFilterValueChanged}
            onBackButtonClick={handleEventDetailBackClick}
            event={eventDetail}
            post_option={showUserPosts}
          />
        }
      </div>
    );
  }  
}