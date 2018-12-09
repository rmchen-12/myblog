import React, { Component } from "react";
import { Input, Form, Icon, Button } from "antd";
const FormItem = Form.Item;
import axios from "axios";

class LoginFormCom extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.userName, values.password);
      }
      axios
        .post("/api/user/login", {
          username: values.userName,
          password: values.password
        })
        .then(res => {
          console.log(res);
        });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleLogin}>
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
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(LoginFormCom);

export default LoginForm;
