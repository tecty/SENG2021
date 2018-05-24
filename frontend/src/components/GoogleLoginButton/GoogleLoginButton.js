import React, { Component } from "react";
import auth from '../../utils/auth';
import { SocialIcon } from 'react-social-icons';
import GoogleLogin from 'react-google-login';


export default class GoogleLoginButton extends Component {
  handleSocialLogin = (response) => {
    auth.googleLogin(response.accessToken).then(success => {
      if (success.success) {
        this.props.handleAlertChanged(null, "Successfully login.")
        setTimeout(() => {
          this.props.handleTokenChanged();
        }, 1000); 
      } else {
        this.props.handleAlertChanged("Unable login with Facebook.", null)
      }
    })
  }

  handleSocialLoginFailure = (response) => {
    this.props.handleAlertChanged("Unable login with Facebook.", null)
  }

  render() {

    return (
      <GoogleLogin
        clientId={'947251242990-kr646kalisteh6nemk7ev7fds84ulmv4.apps.googleusercontent.com'}
        onSuccess={this.handleSocialLogin}
        onFailure={this.handleSocialLoginFailure}
        render={renderProps => (
          <SocialIcon network="google" onClick={renderProps.onClick}/>
        )}
      />
    );
  }
}