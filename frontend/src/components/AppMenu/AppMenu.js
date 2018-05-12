import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './AppMenu.css'
import logo from '../../logo.png';

export default class AppMenu extends Component {
  render() {
    return (
      <div className="AppMenu">
        <Menu
          selectedKeys={['map']}
          mode="horizontal"
        >
          <Menu.Item>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title"> SiRound</h1>
          </header>
          </Menu.Item>
          {/* <Menu.Item key="home" disabled>
            <Icon type="home" />Home
          </Menu.Item> */}
          <Menu.Item key="map">
            <Icon type="environment-o" />Map
          </Menu.Item>
          <Menu.Item key="about us" disabled>
            <Icon type="info-circle-o" />About us
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}