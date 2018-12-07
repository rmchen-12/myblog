import React, { PureComponent } from "react";
import { Tabs } from "antd";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const TabPane = Tabs.TabPane;

class Login extends PureComponent {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="登录" key="1">
          <LoginForm />
        </TabPane>
        <TabPane tab="注册" key="2">
          <RegisterForm />
        </TabPane>
      </Tabs>
    );
  }
}

export default Login;
