import React, { PureComponent } from "react";
import { Tabs, Row, Col } from "antd";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import style from "./index.css";

const TabPane = Tabs.TabPane;

class Login extends PureComponent {
  renderLayout = Component => (
    <Row type={"flex"} justify={"center"} className={style.formLayout}>
      <Col span={18}>{Component}</Col>
    </Row>
  );

  render() {
    const { login, register } = this.props;
    return (
      <Tabs defaultActiveKey="1" tabBarStyle={{ textAlign: "center" }}>
        <TabPane tab="登录" key="1">
          {this.renderLayout(<LoginForm login={login} />)}
        </TabPane>
        <TabPane tab="注册" key="2">
          {this.renderLayout(<RegisterForm register={register} />)}
        </TabPane>
      </Tabs>
    );
  }
}

export default Login;
