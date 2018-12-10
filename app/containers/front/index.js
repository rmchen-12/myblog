import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Layout, Row, Col } from "antd";

import Home from "./home";
import Detail from "./detail";
import Banner from "./components/banner";
import Menus from "./components/menu";
import NotFound from "../../components/notFound";
import Login from "./components/login";
import Logined from "./components/logined";
import style from "./index.css";

import { actions } from "../../reducers/adminManagerTags";
import { actions as FrontActions } from "../../reducers/front";
import { actions as IndexActions } from "../../reducers";

const { Header, Content } = Layout;

class Front extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { login, register } = this.props;
    return (
      <Layout className={style.layout}>
        <Header>
          <Banner />
          <Menus />
        </Header>
        <Content className={style.content}>
          <Row type={"flex"} justify={"center"} align={"top"}>
            <Col span={13} className={style.article}>
              <Switch>
                {/* <Route exact path={url} component={Home} /> */}
                <Route path={"/detail/:id"} component={Detail} />
                <Route path={"/:tag"} component={Home} />
                <Route component={NotFound} />
              </Switch>
            </Col>
            <Col span={5} className={style.login}>
              {this.props.userInfo.userId ? (
                <Logined />
              ) : (
                <Login login={login} register={register} />
              )}
            </Col>
          </Row>
        </Content>
        <div />
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.globalState.userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: bindActionCreators(IndexActions.get_login, dispatch),
    register: bindActionCreators(IndexActions.get_register, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Front);
