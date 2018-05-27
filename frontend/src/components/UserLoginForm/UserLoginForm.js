import React, { Component } from 'react';
import './UserLoginForm.css'
import auth from '../../utils/auth';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import Cookies from 'js-cookie';
import FacebookLoginButton from '../FacebookLoginButton/FacebookLoginButton';
import GithubLoginButton from '../GithubLoginButton/GithubLoginButton';
import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';
import InstagramLoginButton from '../InstagramLoginButton/InstagramLoginButton';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      success: null,
    }
  }

  handleAlertChanged = (error, success) => {
    this.setState({
      error: error,
      success: success,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (values.remember){
          this.saveUser(values.userName, values.password)
        } else this.deleteUser();

        auth.login(values.userName, values.password).then(detail => {
          console.log(detail);
          if (!detail) {
            this.handleAlertChanged("Unknown error.", null)
            return
          }
          else if (detail.key) {
            this.handleAlertChanged(null, "Successfully login.")
            setTimeout(() => {
              this.props.handleTokenChanged()
            }, 1000);
          } else if (detail.non_field_errors) {
            this.handleAlertChanged(detail.non_field_errors[0], null)
          } else {
            this.handleAlertChanged("Unknown error.", null)
          }
        })
      }
    });
  }

  saveUser(username, password) {
    Cookies.set('username', username);
    Cookies.set('password', password);
    console.log(username)
  }

  deleteUser() {
    Cookies.remove('username');
    Cookies.remove('password');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { error, success } = this.state;
    const username = Cookies.get('username') !== 'null' ? Cookies.get('username') : "";
    const password = Cookies.get('password') !== 'null' ? Cookies.get('password') : "";
    const FormItem = Form.Item;

    return (
      <div className="UserLoginForm">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue: username
            })(
              <Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="Username" 
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: password,
            })(
              <Input 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password" 
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox className="login-form-remember-me">Remember me</Checkbox>
            )}
            {/* <a className="login-form-forgot">Forgot password</a> */}
            <br/>
            <Button type="primary" htmlType="submit" className="login-form-button" icon="login">
              Log in
            </Button>
            <br/>
            Or <a onClick={this.props.onRegisterClick} style={{color:"#42a5f5"}}>register now!</a>
            <br/>
            <b>Use another account:</b>
            <br/>
            <div className="third-party-login">
            <FacebookLoginButton 
              handleTokenChanged={this.props.handleTokenChanged} 
              handleAlertChanged={this.handleAlertChanged}
            /> &nbsp;
            <GithubLoginButton /> &nbsp;
            <GoogleLoginButton 
              handleTokenChanged={this.props.handleTokenChanged} 
              handleAlertChanged={this.handleAlertChanged}
            /> &nbsp;
            <InstagramLoginButton />
            </div>
          </FormItem>
        </Form>
        { error && <Alert message={error} type="error" showIcon /> }
        { success && <Alert message={success} type="success" showIcon />}
      </div>
    );
  }
}

const UserLoginForm = Form.create()(LoginForm);
export default UserLoginForm;