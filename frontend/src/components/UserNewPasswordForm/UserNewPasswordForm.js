import React, { Component } from 'react';
import './UserNewPasswordForm.css'
import auth from '../../utils/auth';
import { Form, Icon, Input, Button, Alert } from 'antd';
const FormItem = Form.Item;

class NewPasswordForm extends Component {
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
        auth.changePassword(values.password, values.confirm).then(detail => {
          if (!detail) {
            this.setState({
              error: "Unknown error.",
              success: null,
            })
          } else if (detail.success) {
            this.setState({
              error: null,
              success: detail.detail,
            })
            setTimeout(() => {
              this.props.onLogoutClick();
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
          } else if (detail.detail) {
            this.setState({
              error: detail.detail[0],
              success: null,
            })
          } else {
            this.setState({
              error: "Unknown Error.",
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
      <div className="UserNewPasswordForm">
        <Form onSubmit={this.handleSubmit} className="new-password-form">
          <FormItem label="New Password">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your new password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            )}
          </FormItem>
          <FormItem label="Confirm New Password">
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your new password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="change-password-button" icon="save">Update Password</Button>
          </FormItem>
        </Form>
        { error && <Alert message={error} type="error" showIcon /> }
        { success && <Alert message={success} description="Please Sign in again." type="success" showIcon />}
      </div>
    );
  }
}

const UserNewPasswordForm = Form.create()(NewPasswordForm);
export default UserNewPasswordForm;