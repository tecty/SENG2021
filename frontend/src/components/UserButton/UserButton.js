import React, { Component } from 'react';
import './UserButton.css';
import UserUnauthorized from '../UserUnauthorized/UserUnauthorized';
import UserAuthorized from '../UserAuthorized/UserAuthorized';

export default class UserButtoon extends Component {
  render() {
    const user = !this.props.authorized ?
      <UserUnauthorized handleTokenChanged={this.props.handleTokenChanged}/> : 
      <UserAuthorized handleTokenChanged={this.props.handleTokenChanged} user={this.props.user}/>

    return(
      <div className="UserButton">
        {user}
      </div>
    );
  }
}