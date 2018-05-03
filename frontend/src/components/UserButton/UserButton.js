import React, { Component } from 'react';
import { Avatar, Button } from 'antd';
import './UserButton.css';

export default class UserButton extends Component {
  render () {
    return (
      <div className="UserButton">
      <Button shape="circle" size="large">
        <div className="UserButton-avatar">
        <Avatar size="large" icon="user" />
        </div>
      </Button>
      </div>
    );
  }
}