import React, { Component } from 'react';
import './EventsListFilter.css';
import { Input, Icon } from 'antd';

export default class EventsListFilter extends Component {
  handleChanged = (e) => {
    this.props.handleValueChanged(e.target.value);
  }

  render() {
    return (
      <div className="EventsListFilter">
        <Input
          value={this.props.value}
          placeholder={"Filter by ..."}
          prefix={<Icon type="filter" />}
          onChange={this.handleChanged}
        />
      </div>
    );
  }
}