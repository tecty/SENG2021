import React, { Component } from 'react';
import './UserAuthorized.css';
import { Menu, Dropdown, Avatar, Icon, Modal } from 'antd';
import auth from '../../utils/auth';
import UserNewPasswordForm from '../UserNewPasswordForm/UserNewPasswordForm';
import UserInfoForm from '../UserInfoForm/UserInfoForm';

export default class UserAuthorized extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      change_password: false,
      user_info: false,
    }
  }

  onAuthorizedMenuClick = ({ key }) => {
    switch(key) {
      case "user_info":
        this.setState({
          visible: true,
          user_info: true,
          change_password: false,
        })
        break;
      case "change_password":
        this.setState({
          visible: true,
          user_info: false,
          change_password: true,
        })
        break;
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

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { user } = this.props;
    const { visible, user_info, change_password } = this.state;

    const menu = (
      <Menu onClick={this.onAuthorizedMenuClick}>
        <Menu.Item key="user_info"><Icon type="user" /> Sign in as <b>{user.username}</b></Menu.Item>
        <Menu.Divider />
        <Menu.Item key="change_password"><Icon type="setting" /> Change password</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="sign_out"><Icon type="logout" /> Sign out</Menu.Item>
      </Menu>
    );

    return (
      <div className="UserAuthorized">
        <Dropdown overlay={menu} trigger={['click']}>
          <a role="button">
            <Avatar style={{ backgroundColor: '#87d068', verticalAlign: 'middle' }} size="large" >
              {user.username[0].toUpperCase()}
            </Avatar>
          </a>
        </Dropdown>
        <Modal
          wrapClassName="UserAuthorized-modal"
          visible={visible}
          maskClosable={false}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={[
          ]}
        >
          {change_password && <UserNewPasswordForm onLogoutClick={this.onLogoutClick}/>}
          {user_info && <UserInfoForm user={this.props.user} handleTokenChanged={this.props.handleTokenChanged}/>}
        </Modal>
      </div>
    );
  }
}