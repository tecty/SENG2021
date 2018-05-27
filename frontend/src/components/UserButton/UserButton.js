import React, { Component } from 'react';
import './UserButton.css';
import UserUnauthorized from '../UserUnauthorized/UserUnauthorized';
import UserAuthorized from '../UserAuthorized/UserAuthorized';

export default class UserButtoon extends Component {
  handleShowUserPostsChanged = () => {
    this.props.handleShowUserPostsChanged(true, this.props.user.username)
  }

  render() {
    const user = !this.props.authorized ?
      <UserUnauthorized handleTokenChanged={this.props.handleTokenChanged}/> : 
      <UserAuthorized 
        handleTokenChanged={this.props.handleTokenChanged} 
        user={this.props.user}
        handleShowUserPostsChanged={this.handleShowUserPostsChanged}
      />

    return(
      <div className="UserButton">
        {user}
      </div>
    );
  }
}