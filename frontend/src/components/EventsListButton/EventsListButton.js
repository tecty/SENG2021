import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import './EventsListButton.css'

export default class EventsListButton extends Component {
  render() {
    return (
      <div className="EventsListButton">
        <Button type="primary" size="large" onClick={this.props.onClick} style={{ marginBottom: 16 }}>
          <Icon type={this.props.show  ? 'menu-unfold' : 'menu-fold'} />
        </Button>
      </div>
    );
  }
}