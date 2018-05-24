import React, { Component } from "react";
import auth from '../../utils/auth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { SocialIcon } from 'react-social-icons';

export default class FacebookLoginButton extends Component {

  responseFacebook = (response) => {
    if (response.accessToken) {
      auth.facebookLogin(response.accessToken).then(success => {
        if (success.success) {
          this.props.handleAlertChanged(null, "Successfully login.")
          setTimeout(() => {
            this.props.handleTokenChanged();
          }, 1000); 
        } else {
          this.props.handleAlertChanged("Unable login with Facebook.", null)
        }
      })
    } else {
      this.props.handleAlertChanged("Unable login with Facebook.", null)
    }
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId="193434881281521"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.responseFacebook}
        render={renderProps => (
            <SocialIcon network="facebook" onClick={renderProps.onClick}/>
        )}
      />
    );
  }
}