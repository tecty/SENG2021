import React, { Component } from 'react';
import './UserLoginForm.css'
import auth from '../../utils/auth';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { SocialIcon } from 'react-social-icons';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import Cookies from 'js-cookie';
const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      success: null,
    }
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
            this.setState({
              error: "Unknown error.",
              success: null,
            })
            return
          }
          else if (detail.key) {
            this.setState({
              error: null,
              success: "Successfully login.",
            })
            setTimeout(() => {
              this.props.handleTokenChanged()
            }, 1000);
          } else if (detail.non_field_errors) {
            this.setState({
              error: detail.non_field_errors[0],
              success: null,
            })
          } else {
            this.setState({
              error: "Unknown error.",
              success: null,
            })
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

  responseFacebook = (response) => {
    if (response.accessToken) {
      auth.facebookLogin(response.accessToken).then(success => {
        if (success.success) {
          this.setState({
            error: null,
            success: "Successfully login.", 
          })
          setTimeout(() => {
            this.props.handleTokenChanged();
          }, 1000); 
        } else {
          this.setState({
            error: "Unable login with Facebook.",
            success: null, 
          }); 
        }
      })
    } else {
      this.setState({
        error: "Unable login with Facebook.",
        success: null, 
      }); 
    }
    console.log(response);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error, success } = this.state;
    const username = Cookies.get('username') !== 'null' ? Cookies.get('username') : "";
    const password = Cookies.get('password') !== 'null' ? Cookies.get('password') : "";

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
            <FacebookLogin
              appId="193434881281521"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}
              render={renderProps => (
                  <SocialIcon network="facebook" onClick={renderProps.onClick}/>
              )}
            />
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