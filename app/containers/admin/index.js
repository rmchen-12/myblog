import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import PropTypes from "prop-types";
import style from "./index.css";

import NotFound from "../../components/notFound";
import Index from "./index";
import ManageUser from "./manageUser";
import ManageArticle from "./manageArticle";
import ManageTags from "./manageTags";
import ManageComment from "./manageComment";
import Detail from "./detail";
import NewArticle from "./newArticle";

import { bindActionCreators } from "redux";
import { actions } from "../../reducers/admin";

const { change_location_admin } = actions;
const { Header, Content, Footer, Sider } = Layout;

class Admin extends PureComponent {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   this.props.change_location_admin(
  //     window.location.pathname.replace(/\/admin/, "") || "/"
  //   );
  // }

  render() {
    const {
      match: { url },
      userInfo
    } = this.props;
    if (userInfo && userInfo.userType) {
      return (
        <div>
          {userInfo.userType === "admin" ? (
            <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
              >
                <div className={style.logo} />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                  <Menu.Item key="1">
                    <Icon type="user" />
                    <span>nav 1</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span>nav 2</span>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Icon type="upload" />
                    <span>nav 3</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: "#fff", padding: 0 }}>
                  <Icon
                    className={style.trigger}
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                  />
                </Header>
                <Content className={style.content}>
                  <Switch>
                    <Route exact path={url} component={Index} />
                    <Route
                      exact
                      path={`${url}/manageUser`}
                      component={ManageUser}
                    />
                    <Route path={`${url}/manageTags`} component={ManageTags} />
                    <Route path={`${url}/newArticle`} component={NewArticle} />
                    <Route
                      path={`${url}/manageArticle`}
                      component={ManageArticle}
                    />
                    <Route
                      path={`${url}/manageComment`}
                      component={ManageComment}
                    />
                    <Route path={`${url}/detail`} component={Detail} />
                    <Route component={NotFound} />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}

Admin.defaultProps = {
  adminUrl: "/"
};

Admin.propsTypes = {
  adminUrl: PropTypes.string,
  change_location_admin: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    adminUrl: state.admin.adminGlobalState,
    userInfo: state.globalState.userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    change_location_admin: bindActionCreators(change_location_admin, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
