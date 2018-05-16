import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './AppMenu.css'
import logo from '../../logo.png';
import { Link } from 'react-router-dom';

export default class AppMenu extends Component {
  render() {
    return (
      <div className="AppMenu">
        <Menu
          selectedKeys={[this.props.page]}
          mode="horizontal"
        >
          <Menu.Item>
            <Link to='/'>
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="home" disabled>
            <Icon type="home" />Home
          </Menu.Item> */}
          <Menu.Item key="map">
            <Link to='/map'>
              <Icon type="environment-o" />Map
            </Link>
          </Menu.Item>
          <Menu.Item key="about_us">
            <Link to='/about_us'>
              <Icon type="info-circle-o" />About us
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}