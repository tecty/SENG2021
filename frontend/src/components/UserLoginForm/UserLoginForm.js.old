import React, { Component } from 'react';
import { Modal, Button, Input, Alert, Icon } from 'antd';
import './UserLoginForm.css'
import auth from '../../utils/auth';
import FacebookLogin from 'react-facebook-login';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

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
    auth.getUserStatus().then(a => console.log(a))
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
          this.props.handleTokenChanged();
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
  
  responseFacebook = (response) => {
    if (response.accessToken) {
      auth.facebookLogin(response.accessToken).then(success => {
        this.setState({
          usernameAlert: null,
          passwordAlert: null,
          otherAlert: null,
          successAlert: "Successfully login.", 
        })
        setTimeout(() => {
          this.props.handleTokenChanged();
        }, 1000); 
      })
    } else {
      this.setState({
        usernameAlert: null,
        passwordAlert: null,
        otherAlert: "Unable login with Facebook.",
        successAlert: null, 
      }); 
    }
    console.log(response);
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
            prefix={<Icon type="user" />}
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
            prefix={<Icon type="key" />}
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
          <br />
          <br />
          <FacebookLogin
            appId="193434881281521"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.responseFacebook}
            icon={<TiSocialFacebookCircular/>}
            size="small"
            tag="button"
          />
        </Modal>
      </div>
    );
  }
}