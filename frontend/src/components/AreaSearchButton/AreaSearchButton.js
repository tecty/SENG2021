import React, { Component } from 'react';
import { Button } from 'antd';
import './AreaSearchButton.css';

export default class AreaSearchButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: !this.props.autoloaded,
    }

    if (this.state.loading) {
      this.props.autoLoadedChanged(true);
      this.props.onClick();
    }
  }

  handleClick = () => {
    this.setState({
      loading: true
    });
    this.props.onClick();
  }

  render() {
    return(
      <div className="AreaSearchButton">
        <Button
          type="primary"
          icon="search"
          size="large"
          onClick={this.handleClick}
          loading={this.state.loading}
        >Search this area
        </Button>
      </div>
    );
  }
}