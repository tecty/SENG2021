import React, { Component } from "react";
// import auth from '../../utils/auth';
import { SocialIcon } from 'react-social-icons';
import SocialLogin from 'react-social-login';
// import url from '../../utils/url';

const Button = ({ children, triggerLogin, ...props }) => (
  <SocialIcon network="instagram" onClick={triggerLogin} {...props}>
    { children }
  </SocialIcon>
)

const ButtonWithProps = SocialLogin(Button);
export default class InstagramLoginButton extends Component {
  handleSocialLogin = (response) => {
    console.log(response);
  }
  handleSocialLoginFailure = (response) => {
    console.log(response);
  }

  render() {

    return (
      <ButtonWithProps
        provider="instagram"
        appId='5fd2f11482844c5eba963747a5f34556'
        onLoginSuccess={this.handleSocialLogin}
        onLoginFailure={this.handleSocialLoginFailure}
      />
    );
  }
}