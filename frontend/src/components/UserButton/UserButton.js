import React, { Component } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import './UserButton.css';
import UserRegisterForm from '../UserRegisterForm/UserRegisterForm';
import UserLoginForm from '../UserLoginForm/UserLoginForm';

export default class UserButtoon extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      register: false,
      login: false,
    }
  }

  onUnauthorizedMenuClick = ({ key }) => {
    switch(key) {
      case "sign_in":
        this.onLoginChanged(true);
        break;
      case "sign_up":
        this.onRegisterChanged(true);
        break;
      default:
    }
  }

  onAuthorizedMenuClick = ({ key }) => {
    switch(key) {
      case "sign_out":
        this.props.handleAuthorizedChanged(false);
        break;
      default:
    }
  }

  onLoginChanged = (visible) => {
    this.setState({
      login: visible,
    })
  }

  onRegisterChanged = (visible) => {
    this.setState({
      register: visible,
    })
  }


  render () {
    const UserAuthorizedMenu = (
      <Menu onClick={this.onAuthorizedMenuClick}>
        <Menu.Item key="sign_out">Sign out</Menu.Item>
        {/* <Menu.Item key="change_password">Change password</Menu.Item> */}
      </Menu>
    );

    const UserUnauthorizedMenu = (
      <Menu onClick={this.onUnauthorizedMenuClick}>
        <Menu.Item key="sign_in">Sign in</Menu.Item>
        <Menu.Item key="sign_up">Sign up</Menu.Item>
      </Menu>
    );

    const menu = this.props.authorized ? UserAuthorizedMenu : UserUnauthorizedMenu; 
    const { login, register } = this.state;
    const userAvatar = (this.props.authorized) ? 
      <Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" /> :
      <Avatar size="large" icon="user" />;

    return (
      <div className="UserButton">
        <Dropdown overlay={menu}>
          <a role="button">
            {userAvatar}
          </a>
        </Dropdown>
        { register &&
          <UserRegisterForm 
            visible={register} 
            onRegisterChanged={this.onRegisterChanged}
          />
        }
        { login && 
          <UserLoginForm
            visible={login}
            onLoginChanged={this.onLoginChanged}
            onAuthorizedChanged={this.props.handleAuthorizedChanged}
          />
        }
      </div>
    );
  }
}