import React, { Component } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import './UserButton.css';
import UserRegisterForm from '../UserRegisterForm/UserRegisterForm';
// import UserAuthorizedMenu from '../UserAuthorizedMenu/UserAuthorizedMenu';
// import UserUnauthorizedMenu from '../UserUnauthorizedMenu/UserUnauthorizedMenu';

export default class UserButtoon extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      register: false,
    }
  }

  onUnauthorizedMenuClick = ({ key }) => {
    switch(key) {
      case "sign_up":
        this.onRegisterChanged(true);
        break;
      default:
    }
  }

  onRegisterChanged = (visible) => {
    this.setState({
      register: visible,
    })
  }

  render () {
    const UserAuthorizedMenu = (
      <Menu>
        <Menu.Item key="sign_out">Sign out</Menu.Item>
        <Menu.Item key="change_password">Change password</Menu.Item>
      </Menu>
    );

    const UserUnauthorizedMenu = (
      <Menu onClick={this.onUnauthorizedMenuClick}>
        <Menu.Item key="sign_in">Sign in</Menu.Item>
        <Menu.Item key="sign_up">Sign up</Menu.Item>
      </Menu>
    );

    const menu = this.props.authorized ? UserAuthorizedMenu : UserUnauthorizedMenu; 
    const { register } = this.state;

    return (
      <div className="UserButton">
        <Dropdown overlay={menu}>
          <a role="button">
            <Avatar size="large" icon="user" />
          </a>
        </Dropdown>
        <UserRegisterForm 
          visible={register} 
          onRegisterChanged={this.onRegisterChanged}
        />
      </div>
    );
  }
}