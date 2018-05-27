import React, { Component } from 'react';
import './UserPostsFilter.css';
import { Input, Icon } from 'antd';

export default class UserPostsFilter extends Component {
  handleChanged = (e) => {
    this.props.handleValueChanged(e.target.value, true);
  }

  emitEmpty = () => {
    this.filter.focus();
    this.props.handleValueChanged("", true);
  }

  render() {
    const suffix = this.props.value !== "" ? <a style={{color:"inherit"}} role="button"><Icon type="close-circle" onClick={this.emitEmpty} /></a> : null;
    return (
      <div className="UserPostsFilter">
        <Input
          value={this.props.value}
          placeholder={"Filter by ..."}
          prefix={<Icon type="filter" />}
          suffix={suffix}
          onChange={this.handleChanged}
          ref={node => this.filter = node}
        />
      </div>
    );
  }
}