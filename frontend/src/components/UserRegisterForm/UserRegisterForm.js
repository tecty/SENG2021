import React, { Component } from 'react';
import './UserRegisterForm.css'
import auth from '../../utils/auth';
import { Form, Icon, Input, Button, Alert } from 'antd';
const FormItem = Form.Item;

class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmDirty: false,
      error: null,
      success: null,
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        auth.register(values.userName, values.email, values.password, values.confirm).then(detail => {
          if (!detail) {
            this.setState({
              error: "Unknown error.",
              success: null,
            })
          } else if (detail.key) {
            this.setState({
              error: null,
              success: "Successfully registered.",
            })
            setTimeout(() => {
              this.props.handleTokenChanged();
            }, 1000);
          } else if (detail.username) {
            this.setState({
              error: detail.username[0],
              success: null,
            })
          } else if (detail.email) {
            this.setState({
              error: detail.email[0],
              success: null,
            })
          } else if (detail.password1) {
            this.setState({
              error: detail.password1[0],
              success: null,
            })
          } else if (detail.password2) {
            this.setState({
              error: detail.password2[0],
              success: null,
            })
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
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { error, success } = this.state;

    return (
      <div className="UserRegisterForm">
        <Form onSubmit={this.handleSubmit} className="register-form">
          <FormItem label="Username">
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
            )}
          </FormItem>
          <FormItem label="E-mail">
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            )}
          </FormItem>
          <FormItem label="Password">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            )}
          </FormItem>
          <FormItem label="Confirm Password">
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="register-button" icon="form">Register</Button>
          </FormItem>
        </Form>
        { error && <Alert message={error} type="error" showIcon style={{wordBreak: "break-all"}}/> }
        { success && <Alert message={success} type="success" showIcon />}
      </div>
    );
  }
}

const UserRegisterForm = Form.create()(RegisterForm);
export default UserRegisterForm;