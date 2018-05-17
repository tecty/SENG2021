import React, { Component } from 'react';
import { Modal, Button, Input, Alert } from 'antd';
import './UserRegisterForm.css'
import auth from '../../utils/auth';

export default class UserRegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      usernameAlert: null,
      emailAlert: null,
      passwordAlert: null,
      passwordConfirmAlert: null,
      otherAlert: null,
      successAlert: null,
    };
  }

  handleFormClose = () => {
    this.props.onRegisterChanged(false);
  }

  handleUsernameInput = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  
  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  handlePasswordConfirmInput = (e) => {
    this.setState({
      passwordConfirm: e.target.value,
    })
  }

  handleSubmit = () => {
    const { username, email, password, passwordConfirm } = this.state;
    auth.register(
      username, email, password, passwordConfirm
    ).then(detail => {
      if (!detail) {
        this.setState({
          usernameAlert: null,
          emailAlert: null,
          passwordAlert: null,
          passwordConfirmAlert: null,
          otherAlert: "Unknown error.",
          successAlert: null, 
        });
        return;
      }
      else if (detail.key) {
        this.setState({
          usernameAlert: null,
          emailAlert: null,
          passwordAlert: null,
          passwordConfirmAlert: null,
          otherAlert: null,
          successAlert: "Successfully registered.", 
        })
        setTimeout(() => {
          this.props.handleTokenChanged();
        }, 1000);
      }
      else {
        this.setState({
          usernameAlert: detail.username ? detail.username[0] : null,
          emailAlert: detail.email ? detail.email[0] : null,
          passwordAlert: detail.password1 ? detail.password1[0] : null,
          passwordConfirmAlert: detail.password2 ? detail.password2[0] : null,
          otherAlert: detail.non_field_errors ? detail.non_field_errors[0] : null,
          successAlert: null,  
        })
      }
    })
  }

  render() {
    const {
      username,
      email,
      password, 
      passwordConfirm, 
      usernameAlert,
      emailAlert,
      passwordAlert,
      passwordConfirmAlert,
      otherAlert,
      successAlert,
    } = this.state
    return (
      <div>
        <Modal
          wrapClassName="UserRegisterForm-modal"
          visible={this.props.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleFormClose}
          footer={[
            <Button key="back" onClick={this.handleFormClose}>Return</Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>Sign up</Button>,
          ]}
        >
          <br/>
          <Input
            placeholder="Username"
            onChange={this.handleUsernameInput}
            value={username}
          />
          <br/>
          {(usernameAlert) && 
            <div><br/><Alert message={usernameAlert} type="error" showIcon /></div>
          }
          <br/>
          <Input
            placeholder="Email"
            onChange={this.handleEmailInput}
            value={email}
          />
          <br/>
          {(emailAlert) && 
            <div><br/><Alert message={emailAlert} type="error" showIcon /></div>
          }
          <br/>
          <Input
            placeholder="Password"
            onChange={this.handlePasswordInput}
            type="password"
            value={password}
          />
          <br/>
          {(passwordAlert) && 
            <div><br/><Alert message={passwordAlert} type="error" showIcon /></div>
          }
          <br/>
          <Input
            placeholder="Confirm password"
            onChange={this.handlePasswordConfirmInput}
            type="password"
            value={passwordConfirm}
          />
          {(passwordConfirmAlert) && 
            <div><br/><Alert message={passwordConfirmAlert} type="error" showIcon /></div>
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