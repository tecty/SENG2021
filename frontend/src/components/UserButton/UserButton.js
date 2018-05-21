import React, { Component } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import './UserButton.css';
import UserRegisterForm from '../UserRegisterForm/UserRegisterForm';
import UserLoginForm from '../UserLoginForm/UserLoginForm';
import auth from '../../utils/auth';

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
        {/* <Menu.Item key="change_password">        </Menu.Item> */}
      </Menu>
    );

    const UserUnauthorizedMenu = (
      <Menu onClick={this.onUnauthorizedMenuClick}>
        <Menu.Item key="sign_in">Sign in</Menu.Item>
        <Menu.Item key="sign_up">Sign up</Menu.Item>
      </Menu>
    );

    const { authorized } = this.props;

    const menu = authorized ? UserAuthorizedMenu : UserUnauthorizedMenu; 
    const { login, register } = this.state;
    const userAvatar = (authorized) ? 
      <Avatar style={{ backgroundColor: '#87d068' }} size="large" icon="user" /> :
      <Avatar size="large" icon="user" />;

    return (
      <div className="UserButton">
      {/* {console.log(this.props.token)} */}
      {/* {console.log(authorized)} */}
        <Dropdown overlay={menu} trigger={['click']}>
          <a role="button">
            {userAvatar}
          </a>
        </Dropdown>
        { register &&
          <UserRegisterForm 
            visible={register} 
            onRegisterChanged={this.onRegisterChanged}
            handleTokenChanged={this.props.handleTokenChanged}
          />
        }
        { login && 
          <UserLoginForm
            visible={login}
            onLoginChanged={this.onLoginChanged}
            onAuthorizedChanged={this.props.handleAuthorizedChanged}
            handleTokenChanged={this.props.handleTokenChanged}
          />
        }
      </div>
    );
  }
}