import React, { Component } from 'react';
import './UserInfoForm.css'
import auth from '../../utils/auth';
import { Form, Icon, Input, Button, Alert } from 'antd';
const FormItem = Form.Item;

class InfoForm extends Component {
  constructor(props) {
    super(props)

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
        auth.changeUserInfo(values.userName, values.first_name, values.last_name).then(detail => {
          console.log(detail)
          if (!detail) {
            this.setState({
              error: "Unknow error.",
              success: null,
            })
          } else if (detail.success) {
            this.setState({
              error: null,
              success: "Successfully saved."
            })
            setTimeout(() => {
              this.props.handleTokenChanged()
            }, 1000)
          } else if (detail.username) {
            this.setState({
              error: detail.username[0],
              success: null,
            })
          } else if (detail.first_name) {
            this.setState({
              error: detail.first_name[0],
              success: null,
            })
          } else if (detail.last_name) {
            this.setState({
              error: detail.last_name[0],
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
              error: "Unknow error.",
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
    const { user } = this.props;

    return (
      <div className="UserInfoForm">
        <br />
        <Form onSubmit={this.handleSubmit} className="info-form">
          <FormItem >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue: user.username,
            })(
              <Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
              initialValue: user.email,
            })(
              <Input 
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="Third party login, no email required"
                disabled
              />
            )}
          </FormItem>
          <FormItem >
            {getFieldDecorator('first_name', {
              initialValue: user.first_name,
            })(
              <Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="First name"
              />
            )}
          </FormItem>
          <FormItem >
            {getFieldDecorator('last_name', {
              initialValue: user.last_name,
            })(
              <Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="Last name"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="info-save-button" icon="save">Save</Button>
          </FormItem>
        </Form>
        { error && <Alert message={error} type="error" showIcon /> }
        { success && <Alert message={success} type="success" showIcon />}
      </div>
    );
  }
}

const UserInfoForm = Form.create()(InfoForm);
export default UserInfoForm;