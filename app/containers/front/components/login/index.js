import React, { PureComponent } from "react";
import { Tabs } from "antd";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

const TabPane = Tabs.TabPane;

class Login extends PureComponent {
  render() {
    const { login, register } = this.props;
    return (
      <Tabs defaultActiveKey="1" tabBarStyle={{ textAlign: "center" }}>
        <TabPane tab="登录" key="1">
          <LoginForm login={login} />
        </TabPane>
        <TabPane tab="注册" key="2">
          <RegisterForm register={register} />
        </TabPane>
      </Tabs>
    );
  }
}

export default Login;
