import React, { Component } from 'react';
import { Modal, Button, Input, Alert } from 'antd';
import './UserLoginForm.css'
import auth from '../../utils/auth';

export default class UserLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      usernameAlert: null,
      passwordAlert: null,
      otherAlert: null,
      successAlert: null,
    }
  }

  handleUsernameInput = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  handleSubmit = () => {
    const { username, password } = this.state;
    auth.login(username, password).then(detail => {
      console.log(detail);
      if (!detail) {
        this.setState({
          usernameAlert: null,
          passwordAlert: null,
          otherAlert: "Unknown error.",
          successAlert: null, 
        });
        return;
      }
      else if (detail.key) {
        this.setState({
          usernameAlert: null,
          passwordAlert: null,
          otherAlert: null,
          successAlert: "Successfully login.", 
        })
        setTimeout(() => {
          this.setState({
            username: '',
            password: '',
            successAlert: null,
          });
          this.handleFormClose();
          this.props.onAuthorizedChanged(true);
        }, 1000);
      }
      else {
        this.setState({
          usernameAlert: detail.username ? detail.username[0] : null,
          passwordAlert: detail.password ? detail.password[0] : null,
          otherAlert: detail.non_field_errors ? detail.non_field_errors[0] : null,
          successAlert: null,  
        })
      }
    })
  }
 
  handleFormClose = () => {
    this.props.onLoginChanged(false);
  }

  render() {
    const {
      username,
      password,
      usernameAlert,
      passwordAlert,
      otherAlert,
      successAlert,
    } = this.state;

    return (
      <div>
        <Modal
          wrapClassName="UserRegisterForm-modal"
          visible={this.props.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleFormClose}
          footer={[
            <Button key="back" onClick={this.handleFormClose}>Return</Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>Sign in</Button>,
          ]}
        >
          <br/>
          <Input
            placeholder="Username"
            onChange={this.handleUsernameInput}
            value={username}
          />
          <br/>
          {usernameAlert &&
            <div><br/><Alert message={usernameAlert} type="error" showIcon /></div>
          }
          <br/>
          <Input
            placeholder="Password"
            onChange={this.handlePasswordInput}
            type="password"
            value={password}
          />
          {passwordAlert &&
            <div><br/><Alert message={passwordAlert} type="error" showIcon /></div>
          }
          {(otherAlert) && 
            <div><br/><Alert message={otherAlert} type="error" showIcon /></div>
          }
          {(successAlert) &&
            <div><br/><Alert message={successAlert} type="success" showIcon /></div>
          }
        </Modal>
      </div>
    );
  }
}