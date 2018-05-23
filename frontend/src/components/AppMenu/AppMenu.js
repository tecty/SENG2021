import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './AppMenu.css'
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import url from '../../utils/url';

export default class AppMenu extends Component {
  render() {
    // const { token } = this.props;
    const link = url.get();

    return (
      <div className="AppMenu">
        <Menu
          selectedKeys={[this.props.page]}
          mode="horizontal"
        >
          <Menu.Item>
            {/* <Link to='/'> */}
            <a href={link}>
              <img src={logo} className="AppMenu-logo" alt="logo" />
            </a>
            {/* </Link> */}
          </Menu.Item>
         {/* <Menu.Item key="home">
            <Link to='/'>
              <Icon type="home" />Home
            </Link>
          </Menu.Item> */}
          <Menu.Item key="map">
            <Link to='/map'>
              <Icon type="environment-o" />Map
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="about_us">
            <Link to='/about_us'>
              <Icon type="info-circle-o" />About us
            </Link>
          </Menu.Item> */}
        </Menu>
      </div>
    );
  }
}