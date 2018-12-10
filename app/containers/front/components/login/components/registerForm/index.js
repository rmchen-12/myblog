import React, { Component } from "react";
import { Input, Form, Icon, Button } from "antd";
const FormItem = Form.Item;

class registerForm extends Component {
  constructor(props) {
    super(props);
  }

  handleRegister = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.register(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleRegister}>
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "请输入用户名!" }]
          })(<Input placeholder="Username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码!" }]
          })(<Input type="password" placeholder="Password" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("passwordRe", {
            rules: [{ required: true, message: "请输入密码!" }]
          })(<Input type="password" placeholder="Repeat Password" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(registerForm);

export default LoginForm;
