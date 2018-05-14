import React, { Component } from 'react';
import { Avatar, Dropdown } from 'antd';
import './UserButton.css';
import UnauthorizedMenu from '../UnauthorizedMenu/UnauthorizedMenu';
import AuthorizedMenu from '../AuthorizedMenu/AuthorizedMenu';

export default class UserButton extends Component {
  render () {
    const menu = this.props.authorized ? AuthorizedMenu : UnauthorizedMenu; 
    return (
      <div className="UserButton">
        <Dropdown overlay={menu}>
          <a role="button">
            <Avatar size="large" icon="user" />
          </a>
        </Dropdown>
      </div>
    );
  }
}