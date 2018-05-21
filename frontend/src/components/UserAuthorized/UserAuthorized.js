import React, { Component } from 'react';
import './UserAuthorized.css';
import { Menu, Dropdown, Avatar, Icon } from 'antd';
import auth from '../../utils/auth';

export default class UserAuthorized extends Component {
  onAuthorizedMenuClick = ({ key }) => {
    switch(key) {
      case "sign_out":
        this.onLogoutClick();        
        break;
      default:
    }
  }
  onLogoutClick = () => {
    auth.logout().then(detail => {
      if (detail.success) this.props.handleTokenChanged();
    })
  }

  render() {
    const { user } = this.props;
    const menu = (
      <Menu onClick={this.onAuthorizedMenuClick}>
        <Menu.Item key="userStatus">Sign in as <b>{user.username}</b></Menu.Item>
        <Menu.Divider />
        <Menu.Item key="sign_out"><Icon type="logout" /> Sign out</Menu.Item>
      </Menu>
    );

    return (
      <div className="UserAuthorized">
        <Dropdown overlay={menu} trigger={['click']}>
          <a role="button">
            <Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" />
          </a>
        </Dropdown>
      </div>
    );
  }
}