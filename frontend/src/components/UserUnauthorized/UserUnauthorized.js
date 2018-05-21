import React, { Component } from 'react';
import { Modal, Avatar } from 'antd';
import './UserUnauthorized.css'
import UserLoginForm from '../UserLoginForm/UserLoginForm';
import UserRegisterForm from '../UserRegisterForm/UserRegisterForm';

export default class UserUnauthorized extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      register: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      register: false,
    })
  }

  handleRegisterClick = () => {
    this.setState({
      register: true
    })
  }

  render() {
    const { visible, register } = this.state;

    return (
      <div className="UserUnauthorized">
        <a role="button" onClick={this.showModal}>
          <Avatar size="large" icon="user" />
        </a>
        <Modal
          wrapClassName="UserUnauthorized-modal"
          visible={visible}
          maskClosable={false}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={[
            // <Button key="back" onClick={this.handleCancel}>Return</Button>,
            // <Button key="Register" type="primary" onClick={this.handleSubmit}>Sign up</Button>,
            // <Button key="login" type="primary" onClick={this.handleSubmit}>Sign in</Button>,
          ]}
        >
          <br/>
          { !register && 
            <UserLoginForm 
              handleTokenChanged={this.props.handleTokenChanged} 
              onRegisterClick={this.handleRegisterClick}
            />
          }
          { register && <UserRegisterForm handleTokenChanged={this.props.handleTokenChanged}/> }
        </Modal>
      </div>
    );
  }
}