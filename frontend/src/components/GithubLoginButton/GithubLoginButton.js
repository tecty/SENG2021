import React, { Component } from "react";
// import auth from '../../utils/auth';
import { SocialIcon } from 'react-social-icons';
import SocialLogin from 'react-social-login';
import url from '../../utils/url';

const Button = ({ children, triggerLogin, ...props }) => (
  <SocialIcon network="github" onClick={triggerLogin} {...props}>
    { children }
  </SocialIcon>
)

const ButtonWithProps = SocialLogin(Button);

export default class GithubLoginButton extends Component {
  handleSocialLogin = (response) => {
    console.log(response);
  }
  handleSocialLoginFailure = (response) => {
    console.log(response);
  }

  render() {
    const link = url.get();

    return (
      <ButtonWithProps
        provider="github"
        appId='b6c05f504e50845bc841'
        gatekeeper={link}
        redirect={link}
        onLoginSuccess={this.handleSocialLogin}
        onLoginFailure={this.handleSocialLoginFailure}
      />
    );
  }
}